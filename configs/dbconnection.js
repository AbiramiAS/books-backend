import mongoose from "mongoose";

const DB_URL = process.env.MONGO_URI || "mongodb://localhost:27017/blog-app";
const connectDB = async () => {
          try {
                    await mongoose.connect(DB_URL);
          }
          catch (err) {
                    console.log("Error Occured", err);
          }
}
export default connectDB
