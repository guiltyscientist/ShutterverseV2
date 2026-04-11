import { Router } from 'express';
import uploadTo, { cloudinary } from '../config/Cloudinary.js';
import Member from '../models/MemberModel.js'

const router = Router();

router.post('/', uploadTo('SHUTTERVERSE/MEMBER').single('profilImg'), async (req, res) => {

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
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            description: req.body.description,
            socialMedia: req.body.socialMedia
        });
        await member.save();
        res.json(member);
    } catch (error) {
        await rollback()

        if (error.code === 11000) {
            return res.status(409).json({ Error: `ID '${req.body.id}' is already taken` });
        }

        res.status(500).json({ Error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const team = await Member.find();
        res.json(team);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});


router.patch('/:id', uploadTo('SHUTTERVERSE/MEMBER').single('profilImg'), async (req, res) => {
    try {
        const update = {
            ...req.body,
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
        res.status(500).json({ Error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
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
        res.status(500).json({ Error: error.message });
    }
});

export default router;