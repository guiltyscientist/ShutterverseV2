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
                // Größer als 2560px braucht keine Ansicht — spart Speicher und Ladezeit
                { width: 2560, crop: 'limit' },
                { quality: 'auto' },
                { fetch_format: 'auto' }
            ]
        }
    });
    return multer({
        storage,
        limits: { fileSize: 10 * 1024 * 1024 } // 10 MB — matches Cloudinary free plan limit
    });
};

export { cloudinary };
export default uploadTo;