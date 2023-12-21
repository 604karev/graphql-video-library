import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const directorSchema = new Schema({
    name: String,
    age: Number,
});

export default model('Director', directorSchema);