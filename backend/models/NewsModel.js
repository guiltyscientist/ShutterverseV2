import { Schema, model } from 'mongoose';

const NewsSchema = new Schema({
    id: { type: String, required: true, unique: true },
    titleImg: {
        url: { type: String, default: null },
        publicId: { type: String, default: null }
    },
    title: { de: { type: String, required: true }, en: { type: String, default: null } },
    description: { de: { type: String, required: true }, en: { type: String, default: null } },
    tag: { type: String, enum: ['news', 'event', 'set', 'workshop'], default: 'news' },
    created: { type: Date, default: Date.now }
}, { versionKey: false });

export default model('News', NewsSchema, 'News');
