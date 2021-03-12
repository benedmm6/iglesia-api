import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        unique: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
},{
    timestamps: true,
    versionKey: false
});

usuarioSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

usuarioSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

export default model('User',usuarioSchema);
