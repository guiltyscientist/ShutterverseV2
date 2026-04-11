import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import studioRoutes from './routes/Studios.js'
import newsRoutes from './routes/News.js'
import teamRoutes from './routes/Team.js'

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(error => console.error(error));

app.use('/api/studios', studioRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/team', teamRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ Error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server runs on port ${PORT}`));