import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  username: String,
  email: String,
  phone: Number,
  company: {
    name: { type: String },
    website: { type: String },
    address: { type: String },
  },
});

const UserData = mongoose.model("user_lists", userSchema);

export default UserData;
