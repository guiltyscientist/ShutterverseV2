import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, default: '' },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'editor'], default: 'editor' },
    created: { type: Date, default: Date.now }
}, { versionKey: false });

export default model('User', UserSchema, 'Users');
