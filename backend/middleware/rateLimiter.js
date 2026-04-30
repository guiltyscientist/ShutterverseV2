import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { Error: 'Too many login attempts, please try again in 15 minutes' }
});

export const refreshLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 60, // Silent refreshes happen frequently; 60/15min is generous but prevents abuse
    standardHeaders: true,
    legacyHeaders: false,
    message: { Error: 'Too many requests, please try again later' }
});

export const logoutLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { Error: 'Too many requests, please try again later' }
});
