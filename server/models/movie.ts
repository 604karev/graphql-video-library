import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const movieSchema = new Schema({
    name: String,
    genre: String,
    directorId: String,
    rate: Number,
    watched: Boolean,

});

export default model('Movie', movieSchema);