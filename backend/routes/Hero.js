import { Router } from 'express';
import crypto from 'crypto';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from '../config/Cloudinary.js';
import HeroMedia from '../models/HeroMediaModel.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

// Videos are transcoded by Cloudinary (q_auto) so a short muted loop stays
// small on delivery; the upload itself is capped at 50 MB.
const heroStorage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
        const isVideo = file.mimetype.startsWith('video/');
        return {
            folder: 'SHUTTERVERSE/HERO',
            resource_type: isVideo ? 'video' : 'image',
            transformation: isVideo
                ? [{ quality: 'auto' }]
                : [{ quality: 'auto' }, { fetch_format: 'auto' }]
        };
    }
});

const uploadHero = multer({
    storage: heroStorage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if ([...IMAGE_TYPES, ...VIDEO_TYPES].includes(file.mimetype)) return cb(null, true);
        cb(new Error('UNSUPPORTED_TYPE'));
    }
});

function handleUpload(req, res, next) {
    uploadHero.single('media')(req, res, (err) => {
        if (err?.message === 'UNSUPPORTED_TYPE') {
            return res.status(400).json({ Error: 'Nur JPG, PNG, WebP, MP4, WebM oder MOV erlaubt' });
        }
        if (err) return next(err);
        next();
    });
}

router.get('/', async (req, res) => {
    try {
        const media = await HeroMedia.find().sort({ created: -1 });
        res.json(media);
    } catch (error) {
        res.status(500).json({ Error: 'Internal server error' });
    }
});

router.post('/', authenticate, handleUpload, async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ Error: 'Keine Datei hochgeladen' });
    }

    const isVideo = req.file.mimetype.startsWith('video/');

    try {
        const media = await HeroMedia.create({
            id: crypto.randomUUID(),
            type: isVideo ? 'video' : 'image',
            url: req.file.path,
            publicId: req.file.filename
        });
        res.json(media);
    } catch (error) {
        await cloudinary.uploader.destroy(req.file.filename, {
            resource_type: isVideo ? 'video' : 'image'
        }).catch(() => {});
        res.status(500).json({ Error: 'Internal server error' });
    }
});

router.delete('/:id', authenticate, async (req, res) => {
    try {
        const media = await HeroMedia.findOneAndDelete({ id: req.params.id });
        if (!media) {
            return res.status(404).json({ Error: 'Medium wurde nicht gefunden' });
        }

        await cloudinary.uploader.destroy(media.publicId, {
            resource_type: media.type
        }).catch(() => {});

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ Error: 'Internal server error' });
    }
});

export default router;
