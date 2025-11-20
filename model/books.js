import mongoose from "mongoose";
const Schema = mongoose.Schema;

const booksSchema = new Schema({
          id: Number,
          userId: {
                    type: String,
                    required: true
          },
          title: String,
          body: String
});

const BooksData = mongoose.model("books_list", booksSchema);

export default BooksData;