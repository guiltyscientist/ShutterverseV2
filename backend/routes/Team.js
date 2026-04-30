import { Router } from 'express';
import uploadTo, { cloudinary } from '../config/Cloudinary.js';
import Member from '../models/MemberModel.js'
import authenticate from '../middleware/authenticate.js';

const router = Router();

const ALLOWED_URL_PROTOCOLS = /^https?:\/\//i;

function safeParseJSON(str, fallback) {
    try {
        return JSON.parse(str);
    } catch {
        return fallback;
    }
}

function sanitizeSocialMedia(raw) {
    const parsed = Array.isArray(raw) ? raw : safeParseJSON(raw, []);
    return parsed
        .filter(item => item && typeof item === 'object')
        .map(item => ({
            platform: String(item.platform || '').slice(0, 50),
            // Only allow http/https URLs — block javascript:, data:, etc.
            url: typeof item.url === 'string' && ALLOWED_URL_PROTOCOLS.test(item.url)
                ? item.url.slice(0, 500)
                : '',
        }))
        .filter(item => item.url); // drop entries with no valid URL
}

function parseMemberFields(body) {
    return {
        firstName: body.firstName,
        lastName: body.lastName,
        description: { de: body.description_de || null, en: body.description_en || null },
        roles: {
            de: safeParseJSON(body.roles_de || '[]', []),
            en: safeParseJSON(body.roles_en || '[]', []),
        },
        socialMedia: sanitizeSocialMedia(body.socialMedia),
    };
}

router.post('/', authenticate, uploadTo('SHUTTERVERSE/MEMBER').single('profilImg'), async (req, res) => {

    const rollback = async () => {
        if (!req.file) return;
        await cloudinary.uploader.destroy(req.file.filename)
    };

    try {
        const member = new Member({
            id: req.body.id,
            profilImg: req.file ? {
                url: req.file.path,
                publicId: req.file.filename
            } : null,
            ...parseMemberFields(req.body),
        });
        await member.save();
        res.json(member);
    } catch (error) {
        await rollback()

        if (error.code === 11000) {
            return res.status(409).json({ Error: `ID '${req.body.id}' is already taken` });
        }

        res.status(500).json({ Error: 'Internal server error' });
    }
});


router.get('/', async (req, res) => {
    try {
        const team = await Member.find();
        res.json(team);
    } catch (error) {
        res.status(500).json({ Error: 'Internal server error' });
    }
});


router.patch('/:id', authenticate, uploadTo('SHUTTERVERSE/MEMBER').single('profilImg'), async (req, res) => {
    try {
        const update = {
            ...parseMemberFields(req.body),
            ...(req.file && {
                profilImg: {
                    url: req.file.path,
                    publicId: req.file.filename
                }
            })
        }

        const oldMember = await Member.findOneAndUpdate({ id: req.params.id }, update);

        if (!oldMember) {
            if (req.file) {
                await cloudinary.uploader.destroy(req.file.filename);
            }
            return res.status(404).json({ Error: 'Team member was not found' });
        }

        if (req.file && oldMember.profilImg?.publicId) {
            await cloudinary.uploader.destroy(oldMember.profilImg.publicId);
        }

        res.json({ success: true });

    } catch (error) {
        if (req.file) {
            await cloudinary.uploader.destroy(req.file.filename)
        }
        res.status(500).json({ Error: 'Internal server error' });
    }
});


router.delete('/:id', authenticate, async (req, res) => {
    try {
        const member = await Member.findOneAndDelete({ id: req.params.id });
        if (!member) {
            return res.status(404).json({ Error: 'Team member was not found' })
        }

        if (member.profilImg?.publicId) {
            await cloudinary.uploader.destroy(member.profilImg.publicId);
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ Error: 'Internal server error' });
    }
});

export default router;
