export default function requireAdmin(req, res, next) {
    if (req.admin?.role !== 'admin') {
        return res.status(403).json({ Error: 'Admin privileges required' });
    }
    next();
}
