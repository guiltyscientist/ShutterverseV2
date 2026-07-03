import { Router } from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import User from '../models/UserModel.js';
import authenticate from '../middleware/authenticate.js';
import requireAdmin from '../middleware/requireAdmin.js';
import { revokeRefresh } from './Auth.js';

const router = Router();

// Entire user management is admin-only
router.use(authenticate, requireAdmin);

const usernameValidator = body('username')
    .isString().trim().matches(/^[a-zA-Z0-9._-]{3,40}$/)
    .withMessage('Benutzername: 3–40 Zeichen, nur Buchstaben, Zahlen, . _ -');
const emailValidator = body('email')
    .optional({ values: 'falsy' }).isEmail().withMessage('Ungültige E-Mail-Adresse');
const roleValidator = body('role')
    .isIn(['admin', 'editor']).withMessage('Ungültige Rolle');
const passwordValidator = (optional) => body('password')
    .if((value, { req }) => !optional || value)
    .isString().isLength({ min: 8, max: 128 })
    .withMessage('Passwort muss mindestens 8 Zeichen haben');

function validationError(req) {
    const errors = validationResult(req);
    if (errors.isEmpty()) return null;
    return errors.array()[0].msg || 'Invalid request';
}

async function isLastAdmin(userId) {
    const admins = await User.find({ role: 'admin' }, '_id');
    return admins.length === 1 && admins[0]._id.toString() === String(userId);
}

router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-passwordHash').sort({ created: 1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ Error: 'Internal server error' });
    }
});

router.post('/',
    usernameValidator, emailValidator, roleValidator, passwordValidator(false),
    async (req, res) => {
        const msg = validationError(req);
        if (msg) return res.status(400).json({ Error: msg });

        try {
            const passwordHash = await bcrypt.hash(req.body.password, 12);
            const user = await User.create({
                username: req.body.username,
                email: req.body.email || '',
                passwordHash,
                role: req.body.role
            });
            const { passwordHash: _, ...safe } = user.toObject();
            res.json(safe);
        } catch (error) {
            if (error.code === 11000) {
                return res.status(409).json({ Error: 'Benutzername ist bereits vergeben' });
            }
            res.status(500).json({ Error: 'Internal server error' });
        }
    }
);

router.patch('/:id',
    emailValidator, roleValidator, passwordValidator(true),
    async (req, res) => {
        const msg = validationError(req);
        if (msg) return res.status(400).json({ Error: msg });

        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ Error: 'Benutzer nicht gefunden' });

            // The last remaining admin must keep the admin role
            if (user.role === 'admin' && req.body.role === 'editor' && await isLastAdmin(user._id)) {
                return res.status(400).json({ Error: 'Der letzte Admin kann nicht herabgestuft werden' });
            }

            const credentialsChanged = !!req.body.password || req.body.role !== user.role;

            user.email = req.body.email || '';
            user.role = req.body.role;
            if (req.body.password) {
                user.passwordHash = await bcrypt.hash(req.body.password, 12);
            }
            await user.save();

            // Force re-login on the affected session when credentials/role change
            if (credentialsChanged) revokeRefresh(user._id);

            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ Error: 'Internal server error' });
        }
    }
);

router.delete('/:id', async (req, res) => {
    try {
        if (req.params.id === req.admin.sub) {
            return res.status(400).json({ Error: 'Du kannst dich nicht selbst löschen' });
        }

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ Error: 'Benutzer nicht gefunden' });

        if (user.role === 'admin' && await isLastAdmin(user._id)) {
            return res.status(400).json({ Error: 'Der letzte Admin kann nicht gelöscht werden' });
        }

        await user.deleteOne();
        revokeRefresh(user._id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ Error: 'Internal server error' });
    }
});

export default router;
