import {Schema, model} from 'mongoose';

const grupoSchema = new Schema({
    name: String,
    lider: String,
    fecha_create: Date,
    adress: { street: String, cp: String},
    members: [{ member: String, date: Date }],
    coordinacion: { coordinacion: String, coordinador: String }
},{
    timestamps: true,
    versionKey: false
});

export default model('Grupo', grupoSchema);