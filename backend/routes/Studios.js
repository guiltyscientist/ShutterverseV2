import { Router } from 'express';
import uploadTo, { cloudinary } from '../config/Cloudinary.js';
import Studio from '../models/StudioModel.js';

const router = Router();

router.post('/', uploadTo('SHUTTERVERSE/STUDIOS').fields([
    { name: 'titleImg', maxCount: 1 },
    { name: 'images' }
]), async (req, res) => {

    const rollback = async () => {
        if (!req.files) return;
        const toDelete = [
            req.files?.['titleImg']?.[0]?.filename,
            ...(req.files?.['images']?.map(f => f.filename) || [])
        ].filter(Boolean);
        await Promise.all(toDelete.map(publicId => cloudinary.uploader.destroy(publicId)));
    };

    try {
        const studio = new Studio({
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            titleImg: req.files['titleImg'] ? {
                url: req.files['titleImg'][0].path,
                publicId: req.files['titleImg'][0].filename
            } : null,
            images: req.files['images'] ? req.files['images'].map(f => ({
                url: f.path,
                publicId: f.filename
            })) : []
        });
        await studio.save();
        res.json(studio);
    } catch (error) {
        await rollback();

        if (error.code === 11000) {
            return res.status(409).json({ Error: `ID '${req.body.id}' is already taken` });
        }

        res.status(500).json({ Error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const studios = await Studio.find();
        res.json(studios);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});


router.get('/title-images', async (req, res) => {
    try {
        const studios = await Studio.find({}, 'id title titleImg');
        res.json({
            studios: studios.map(s => ({
                id: s.id,
                title: s.title,
                titleImg: s.titleImg?.url || null
            }))
        });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});


router.patch('/:id', uploadTo('SHUTTERVERSE/STUDIOS').fields([
    { name: 'titleImg', maxCount: 1 },
    { name: 'images' }
]), async (req, res) => {

    const rollback = async () => {
        if (!req.files) return;
        const toDelete = [
            req.files?.['titleImg']?.[0]?.filename,
            ...(req.files?.['images']?.map(f => f.filename) || [])
        ].filter(Boolean);
        await Promise.all(toDelete.map(publicId => cloudinary.uploader.destroy(publicId)));
    };

    try {
        const update = {
            ...req.body,
            ...(req.files['titleImg'] && {
                titleImg: {
                    url: req.files['titleImg'][0].path,
                    publicId: req.files['titleImg'][0].filename
                }
            }),
            ...(req.files['images'] && {
                $push: {
                    images: {
                        $each: req.files['images'].map(f => ({
                            url: f.path,
                            publicId: f.filename
                        }))
                    }
                }
            })
        };

        const oldStudio = await Studio.findOneAndUpdate({ id: req.params.id }, update);

        if (!oldStudio) {
            await rollback();
            return res.status(404).json({ Error: 'Studio was not found' });
        }

        if (req.files['titleImg'] && oldStudio.titleImg?.publicId) {
            await cloudinary.uploader.destroy(oldStudio.titleImg.publicId);
        }

        res.json({ success: true });
    } catch (error) {
        await rollback();
        res.status(500).json({ Error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const studio = await Studio.findOneAndDelete({ id: req.params.id });
        if (!studio) {
            return res.status(404).json({ Error: 'Studio was not found' });
        }

        if (studio.titleImg?.publicId) {
            await cloudinary.uploader.destroy(studio.titleImg.publicId);
        }

        if (studio.images.length > 0) {
            await Promise.all(
                studio.images.map(img => cloudinary.uploader.destroy(img?.publicId))
            );
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});


router.delete('/:id/images/:publicId', async (req, res) => {
    try {
        await cloudinary.uploader.destroy(req.params.publicId);
        await Studio.findOneAndUpdate(
            { id: req.params.id },
            { $pull: { images: { publicId: req.params.publicId } } }
        )
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
})

export default router;