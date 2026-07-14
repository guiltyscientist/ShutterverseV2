import { Schema, model } from 'mongoose';

const LocaleStringSchema = (required = false) => ({
    de: { type: String, required, default: required ? undefined : null },
    en: { type: String, default: null }
});

const StudioSchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { de: { type: String, required: true }, en: { type: String, default: null } },
    description: LocaleStringSchema(),
    equipment: LocaleStringSchema(),
    titleImg: {
        url: { type: String, default: null },
        publicId: { type: String, default: null }
    },
    images: [{
        url: { type: String },
        publicId: { type: String },
    }],
    inspiredBy: [{ type: String }],
    bookingUrl: { type: String, default: null },
    isNew: { type: Boolean, default: false }
}, { versionKey: false });

export default model('Studio', StudioSchema, 'Studios');
