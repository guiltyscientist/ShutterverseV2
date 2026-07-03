import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { body, validationResult } from 'express-validator';
import User from '../models/UserModel.js';
import { loginLimiter, refreshLimiter, logoutLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Per-user hash of the currently valid refresh token (rotation, in-memory).
// Restarting the server logs everyone out — acceptable for this scale.
const validRefreshTokens = new Map();

/** Invalidate a user's refresh token (after password/role change or deletion). */
export function revokeRefresh(userId) {
    validRefreshTokens.delete(String(userId));
}

function hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
}

function issueAccessToken(user) {
    return jwt.sign(
        { sub: user._id.toString(), username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
}

function issueRefreshToken(user) {
    return jwt.sign(
        { sub: user._id.toString() },
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

function publicUser(user) {
    return { username: user.username, email: user.email, role: user.role };
}

// The very first login seeds the admin from .env so existing credentials
// keep working after the switch to DB-backed users.
async function ensureSeedAdmin() {
    if (await User.countDocuments() > 0) return;
    await User.create({
        username: process.env.ADMIN_USERNAME,
        email: '',
        passwordHash: process.env.ADMIN_PASSWORD_HASH,
        role: 'admin'
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

        try {
            await ensureSeedAdmin();
            const user = await User.findOne({ username });

            // Always run bcrypt to prevent timing attacks, even if the user is unknown
            const passwordMatch = await bcrypt.compare(
                password,
                user?.passwordHash || '$2b$12$invalidhashpaddingtopreventshorttiming0000000000000000000'
            );

            if (!user || !passwordMatch) {
                return res.status(401).json({ Error: 'Invalid credentials' });
            }

            const accessToken = issueAccessToken(user);
            const refreshToken = issueRefreshToken(user);
            validRefreshTokens.set(user._id.toString(), hashToken(refreshToken));

            setRefreshCookie(res, refreshToken);
            res.json({ accessToken, user: publicUser(user) });
        } catch (error) {
            console.error(error);
            res.status(500).json({ Error: 'Internal server error' });
        }
    }
);

router.post('/refresh', refreshLimiter, async (req, res) => {
    const token = req.cookies?.refreshToken;
    if (!token) {
        return res.status(401).json({ Error: 'No refresh token' });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch {
        return res.status(401).json({ Error: 'Invalid refresh token' });
    }

    // Validate against the stored hash (rotation check)
    const stored = validRefreshTokens.get(decoded.sub);
    if (!stored || hashToken(token) !== stored) {
        validRefreshTokens.delete(decoded.sub);
        return res.status(401).json({ Error: 'Refresh token revoked' });
    }

    try {
        const user = await User.findById(decoded.sub);
        if (!user) {
            validRefreshTokens.delete(decoded.sub);
            return res.status(401).json({ Error: 'User no longer exists' });
        }

        const accessToken = issueAccessToken(user);
        const newRefreshToken = issueRefreshToken(user);
        validRefreshTokens.set(user._id.toString(), hashToken(newRefreshToken));

        setRefreshCookie(res, newRefreshToken);
        res.json({ accessToken, user: publicUser(user) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: 'Internal server error' });
    }
});

router.post('/logout', logoutLimiter, (req, res) => {
    const token = req.cookies?.refreshToken;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            validRefreshTokens.delete(decoded.sub);
        } catch { /* expired/invalid — nothing to revoke */ }
    }
    res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    res.json({ success: true });
});

export default router;
