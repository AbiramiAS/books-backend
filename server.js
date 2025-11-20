import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import corsOptions from "./configs/corsOptions.js";
import userRoutes from "./routes/userRoutes.js";
import booksRoute from "./routes/booksRoute.js";

// const __dirname = path.resolve();
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blog-app";
const PORT = process.env.PORT || 4000;
dotenv.config();

//Initialization of Express app
const app = express();

app.use(express.json());

//Cors origin handling
app.use(cors(corsOptions));

app.use("/users", userRoutes);
app.use("/books", booksRoute);

app.get("/", (req, res) => {
//   res.json({ status: "200" }).sendFile(path.join(__dirname, "index.html"));
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Mongoose connected successfully!");
    app.listen(PORT, () => {
      console.log(`App running and listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error occured", err);
  });
