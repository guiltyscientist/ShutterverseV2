import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import studioRoutes from './routes/Studios.js'
import newsRoutes from './routes/News.js'
import teamRoutes from './routes/Team.js'
import authRoutes from './routes/Auth.js'

const app = express();

app.set('trust proxy', 1); // Trust first proxy (needed for rate limiting behind reverse proxy/load balancer)
app.use(helmet());
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
app.use('/api/studios', studioRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/team', teamRoutes);

app.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ Error: 'Datei zu groß. Maximale Dateigröße: 10 MB.' });
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
