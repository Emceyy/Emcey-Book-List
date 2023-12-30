const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/EmceyBookStore");



const authorSchema = new mongoose.Schema({
    id: Number,
    AuthorName: String,
  });
  

  const bookSchema = new mongoose.Schema({
    id: Number,
    bookName: String,
    authorname: String,
    pages: Number,
    authorid: Number,
    img_url: String,
    genre: String,
    publisher: String,
  });
  
  const Author = mongoose.model("Author", authorSchema, "Authors");


  const Book = mongoose.model("Book", bookSchema, "Books");
  
  
  module.exports = { Author, Book };
