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

  const userschema = new mongoose.Schema({
    id: Number,
    UserName: String,
    Password: String,
    Email: String,
    UserList: [String],
  });
  
  const Author = mongoose.model("Author", authorSchema, "Authors");


  const Book = mongoose.model("Book", bookSchema, "Books");


  const User = mongoose.model("User", userschema, "Users");
  
  
  module.exports = { Author, Book, User };
