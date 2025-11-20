import express from "express";
import booksController from "../controllers/booksController.js";

const router = express.Router();

router
  .route("/")
  .get(booksController.getAllBooksData)
  .post(booksController.addNewBooksData)
  .put(booksController.updateBookDetails);

export default router;
