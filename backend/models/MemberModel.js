import { Schema, model } from 'mongoose';

const MemberSchema = new Schema({
    id: { type: String, required: true, unique: true },
    profilImg: {
        url: { type: String, default: null },
        publicId: { type: String, default: null }
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    roles: {
        de: [{ type: String }],
        en: [{ type: String }]
    },
    description: { de: { type: String, default: null }, en: { type: String, default: null } },
    socialMedia: [{
        platform: { type: String },
        url: { type: String }
    }]
}, { versionKey: false });

export default model('Member', MemberSchema, 'Members');
