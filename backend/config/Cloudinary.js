import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});

const uploadTo = (folder) => {
    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: folder,
            allowed_formats: ['jpg', 'png', 'webp'],
            transformation: [
                { quality: 'auto' },
                { fetch_format: 'auto' }
            ]
        }
    });
    return multer({ storage });
};

export { cloudinary };
export default uploadTo;