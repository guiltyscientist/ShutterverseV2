import 'dotenv/config'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import studioRoutes from './routes/Studios.js'
import newsRoutes from './routes/News.js'
import teamRoutes from './routes/Team.js'
import authRoutes from './routes/Auth.js'
import userRoutes from './routes/Users.js'
import heroRoutes from './routes/Hero.js'

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(__dirname, '..', 'frontend', 'build');

app.set('trust proxy', 1); // Trust first proxy (needed for rate limiting behind reverse proxy/load balancer)
// Serving the SPA from Express means helmet's CSP now applies to the page itself.
// The defaults would block Cloudinary media, the Google Maps embed and SvelteKit's
// inline bootstrap script, so the allowed sources are declared explicitly.
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"], // SvelteKit inlines its bootstrap script
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
            imgSrc: ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
            mediaSrc: ["'self'", 'https://res.cloudinary.com'], // hero videos
            frameSrc: ['https://www.google.com', 'https://maps.google.com'],
            connectSrc: ["'self'"],
            objectSrc: ["'none'"]
        }
    }
}));
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(error => console.error(error));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/studios', studioRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/hero', heroRoutes);

// Serve the built frontend from the same origin as the API — relative /api calls
// and the sameSite=strict refresh cookie both depend on it. Skipped in local dev,
// where Vite serves the frontend and no build directory exists.
if (fs.existsSync(clientDir)) {
    app.use(express.static(clientDir));
    // SPA fallback: any non-API GET renders index.html so client-side routing works
    app.use((req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') return next();
        if (req.path.startsWith('/api')) return next();
        res.sendFile(path.join(clientDir, 'index.html'));
    });
} else {
    console.warn(`No frontend build at ${clientDir} — serving API only.`);
}

app.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ Error: 'Datei zu groß. Maximum: 10 MB für Bilder, 50 MB für Hero-Medien.' });
    }
    // Multer meldet zu viele Dateien pro Feld als LIMIT_UNEXPECTED_FILE
    if (err.code === 'LIMIT_UNEXPECTED_FILE' || err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({ Error: 'Zu viele Dateien hochgeladen. Maximal 40 Bilder pro Upload.' });
    }
    // Cloudinary rejects files larger than the plan limit after upload starts
    if (err?.http_code === 400 && err?.message?.includes('File size too large')) {
        return res.status(413).json({ Error: 'Datei zu groß für Cloudinary. Maximale Dateigröße: 10 MB.' });
    }
    console.error(err);
    res.status(500).json({ Error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server runs on port ${PORT}`));
