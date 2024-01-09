import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const movieSchema = new Schema({
  name: String,
  genre: String,
  directorId: String,
  rate: Number,
  watched: Boolean,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

export default model("Movie", movieSchema);
