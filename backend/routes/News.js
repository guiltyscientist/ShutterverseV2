import { Router } from 'express';
import uploadTo, { cloudinary } from '../config/Cloudinary.js'
import News from '../models/NewsModel.js'
import authenticate from '../middleware/authenticate.js';

const router = Router();

function parseNewsFields(body) {
    return {
        title: { de: body.title_de, en: body.title_en || null },
        description: { de: body.description_de, en: body.description_en || null },
    };
}

router.post('/', authenticate, uploadTo('SHUTTERVERSE/NEWS').single('titleImg'), async (req, res) => {

    const rollback = async () => {
        if (!req.file) return;
        await cloudinary.uploader.destroy(req.file.filename)
    };

    try {
        const news = new News({
            id: req.body.id,
            titleImg: req.file ? {
                url: req.file.path,
                publicId: req.file.filename
            } : null,
            ...parseNewsFields(req.body),
        })
        await news.save();
        res.json(news);
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
        const news = await News.find();
        res.json(news);
    } catch (error) {
        res.status(500).json({ Error: 'Internal server error' });
    }
});


router.patch('/:id', authenticate, uploadTo('SHUTTERVERSE/NEWS').single('titleImg'), async (req, res) => {
    try {
        const update = {
            ...parseNewsFields(req.body),
            ...(req.file && {
                titleImg: {
                    url: req.file.path,
                    publicId: req.file.filename
                }
            })
        }

        const oldNews = await News.findOneAndUpdate({ id: req.params.id }, update);

        if (!oldNews) {
            if (req.file) await cloudinary.uploader.destroy(req.file.filename)
            return res.status(404).json({ Error: 'News item was not found' });
        }

        if (req.file && oldNews.titleImg?.publicId) {
            await cloudinary.uploader.destroy(oldNews.titleImg.publicId);
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
        const news = await News.findOneAndDelete({ id: req.params.id });
        if (!news) {
            return res.status(404).json({ Error: 'News item was not found' });
        }

        if (news.titleImg?.publicId) {
            await cloudinary.uploader.destroy(news.titleImg.publicId);
        }

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ Error: 'Internal server error' });
    }
});

export default router;
