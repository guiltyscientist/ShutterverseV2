import { Schema, model } from 'mongoose';

const NewsSchema = new Schema({
    id: { type: String, required: true, unique: true },
    titleImg: {
        url: { type: String, default: null },
        publicId: { type: String, default: null }
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    created: { type: Date, default: Date.now }
}, { versionKey: false });

export default model('News', NewsSchema, 'News');