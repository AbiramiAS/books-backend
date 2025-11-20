import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./configs/dbconnection.js"
import corsOptions from "./configs/corsOptions.js";
import userRoutes from "./routes/userRoutes.js";
import booksRoute from "./routes/booksRoute.js";

const PORT = process.env.PORT || 4000;
dotenv.config();
connectDB();

//Initialization of Express app
const app = express();

app.use(express.json());

//Cors origin handling
app.use(cors(corsOptions));

app.use("/users", userRoutes);
app.use("/books", booksRoute);

app.get("/", (req, res) => {
  res.json({ status: "200" }).sendFile(path.join(__dirname, "index.html"));
});


mongoose.connection.once("open", () => {
  console.log("Connection to MongoDB is successful");
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});