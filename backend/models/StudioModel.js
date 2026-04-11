import { Schema, model } from 'mongoose';

const StudioSchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: null },
    equipment: { type: String, default: null },
    titleImg: {
        url: { type: String, default: null },
        publicId: { type: String, default: null }
    },
    images: [{
        url: { type: String },
        publicId: { type: String },
    }]
}, { versionKey: false});

export default model('Studio', StudioSchema, 'Studios');