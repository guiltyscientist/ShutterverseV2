import jwt from 'jsonwebtoken';

export default function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ Error: 'Authentication required' });
    }

    const token = authHeader.slice(7);
    try {
        req.admin = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ Error: 'Token expired' });
        }
        return res.status(401).json({ Error: 'Invalid token' });
    }
}
