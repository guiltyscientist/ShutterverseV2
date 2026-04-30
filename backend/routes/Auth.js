import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { body, validationResult } from 'express-validator';
import { loginLimiter, refreshLimiter, logoutLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Stores a hash of the current valid refresh token (single-admin, in-memory)
let validRefreshTokenHash = null;

function hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
}

function issueAccessToken() {
    return jwt.sign(
        { sub: 'admin', role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
}

function issueRefreshToken() {
    return jwt.sign(
        { sub: 'admin' },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
}

function setRefreshCookie(res, token) {
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api/auth/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}

router.post('/login',
    loginLimiter,
    body('username').isString().notEmpty(),
    body('password').isString().notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ Error: 'Invalid request' });
        }

        const { username, password } = req.body;

        const usernameMatch = username === process.env.ADMIN_USERNAME;
        // Always run bcrypt to prevent timing attacks, even if username is wrong
        const passwordMatch = await bcrypt.compare(
            password,
            process.env.ADMIN_PASSWORD_HASH || '$2b$12$invalidhashpaddingtopreventshorttiming0000000000000000000'
        );

        if (!usernameMatch || !passwordMatch) {
            return res.status(401).json({ Error: 'Invalid credentials' });
        }

        const accessToken = issueAccessToken();
        const refreshToken = issueRefreshToken();
        validRefreshTokenHash = hashToken(refreshToken);

        setRefreshCookie(res, refreshToken);
        res.json({ accessToken });
    }
);

router.post('/refresh', refreshLimiter, (req, res) => {
    const token = req.cookies?.refreshToken;
    if (!token) {
        return res.status(401).json({ Error: 'No refresh token' });
    }

    try {
        jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch {
        return res.status(401).json({ Error: 'Invalid refresh token' });
    }

    // Validate against stored hash (rotation check)
    if (!validRefreshTokenHash || hashToken(token) !== validRefreshTokenHash) {
        validRefreshTokenHash = null;
        return res.status(401).json({ Error: 'Refresh token revoked' });
    }

    const accessToken = issueAccessToken();
    const newRefreshToken = issueRefreshToken();
    validRefreshTokenHash = hashToken(newRefreshToken);

    setRefreshCookie(res, newRefreshToken);
    res.json({ accessToken });
});

router.post('/logout', logoutLimiter, (req, res) => {
    validRefreshTokenHash = null;
    res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    res.json({ success: true });
});

export default router;
