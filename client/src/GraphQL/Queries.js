import { gql } from "@apollo/client";

export const LOAD_BOOKS = gql`
  query {
    getAllBooks {
    id
    bookName
    authorid
    pages
    authorname
    img_url
    genre
    publisher
    }
  }
`;

export const LOAD_BOOKS_BY_PUBLISHER = gql`
  query ($publisher: String!) {
    getBookByPublisher(publisher: $publisher) {
      id
      bookName
      authorid
      pages
      authorname
      img_url
      genre
      publisher
    }
  }
`;

export const LOAD_BOOKS_BY_GENRE = gql`
  query ($genre: String!) {
    getBookByGenre(genre: $genre) {
      id
      bookName
      authorid
      pages
      authorname
      img_url
      genre
      publisher
    }
  }
`;

export const LOAD_BOOKS_BY_AUTHOR = gql`
  query ($AuthorName: String!) {
    getAuthorByName(AuthorName: $AuthorName) {
      id
      AuthorName
      Books{
      id
      bookName
      authorid
      pages
      authorname
      img_url
      genre
      publisher
      }
    }
  }
`;

export const LOAD_BOOKS_BY_BookName = gql`
  query ($BookName: String!) {
    getBookByName(BookName: $BookName) {
      id
      bookName
      authorid
      pages
      authorname
      img_url
      genre
      publisher
    }
  }
`;

export const LOAD_USERS = gql`
  query {
    getAllUsers {
    id
    UserName
    Password
    Email
    UserList
    }
  }
`;

export const LOAD_USER = gql`
  query 
  ($Email: String!,
  $Password: String!
  ) {
    getUser(
      Email: $Email,
      Password: $Password
    ) {
      id
      UserName
      Password
      Email
      UserList
    }
  }
`;