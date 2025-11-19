import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
          id: Number,
          name: {
                    type: String,
                    required: true
          },
          // username: String,
          // email: String,
          // phone: Number,
          // company: {
          //           name: String,
          //           website: String,
          //           address: String
          // },
});

const UserData = mongoose.model("Users", userSchema);

export default UserData;