import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const userSchema = new Schema({
  id: String,
  username: String,
  password: String,
  email: String,
  token: String,
});

export default model("User", userSchema);
