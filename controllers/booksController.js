import BooksData from "../model/books.js";

const getAllBooksData = async (req, res) => {
  const result = await BooksData.find();
  if (!result) return res.json({ message: "No books data found!" });
  res.json({ message: "Books Data", result });
};

const addNewBooksData = async (req, res) => {
  const reqQuery = req.query ? req.query : req.body;

  if (!reqQuery.userId)
    res.status(204).json({ message: "Author id is required!" });
  if (!reqQuery.title) res.status(204).json({ message: "Title is required!" });
  const uniqueTitleCheck = await BooksData.findOne({
    title: reqQuery.title,
  });
  if (!uniqueTitleCheck) {
    const data = await BooksData.create({
      userId: reqQuery.userId,
      title: reqQuery.title,
      body: reqQuery.body,
    });
    res.status(200).json({ message: "Book details added", data: data });
  } else {
    res.json({ message: "Books data present already" });
  }
};

const updateBookDetails = async (req, res) => {
  const reqQuery = req.query ? req.query : req.body;

  if (!reqQuery.userId)
    res.status(204).json({ message: "Author id is required!" });
  if (!reqQuery.title) res.status(204).json({ message: "Title is required!" });
  const fetchData = await BooksData.findOne({ userId: reqQuery.userId }).exec();

  if (!fetchData) res.staus(404).json(`No data found for the ID -${fetchData}`);
  fetchData.title = reqQuery.title;
  fetchData.userId = reqQuery.userId;
  if (reqQuery.body) fetchData.body = reqQuery.body;
  const result = await fetchData.save();
  res.status(200).json({ message: "Data updated successfully!", result });
};

const deleteBooksData = async (req, res) => {
          const reqQuery = req.query ? req.query : req.body;
          if (!reqQuery.id) res.json({ message: "Book Id is required!" });
          const data = await BooksData.deleteOne({ _id: reqQuery.id }).exec();
          res
            .status(200)
            .json({ message: "Books Data deleted successfully!", data });
}

export default {
  getAllBooksData,
  addNewBooksData,
          updateBookDetails,
  deleteBooksData
};
