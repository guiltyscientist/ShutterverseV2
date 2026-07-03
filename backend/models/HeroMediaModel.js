import { Schema, model } from 'mongoose';

const HeroMediaSchema = new Schema({
    id: { type: String, required: true, unique: true },
    type: { type: String, enum: ['image', 'video'], required: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    created: { type: Date, default: Date.now }
}, { versionKey: false });

export default model('HeroMedia', HeroMediaSchema, 'HeroMedia');
