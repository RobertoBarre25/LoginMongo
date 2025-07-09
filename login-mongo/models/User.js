import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  pregunta_seguridad: String,
  respuesta_seguridad: String,
}, { timestamps: true, collection: 'loginUsers' });

const User = mongoose.model("User", userSchema);

export default User;
