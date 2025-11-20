import mongoose from "mongoose";

const Schema = mongoose.Schema;

const registerSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const registerData = mongoose.model("register", registerSchema);

export default registerData;