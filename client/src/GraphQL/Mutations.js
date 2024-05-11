import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
 mutation AddBook(
    $bookName: String!
    $pages: String
    $img_url: String
    $genre: String
    $publisher: String
    $authorname: String!
 ) {
  AddBook(
      bookName: $bookName
      pages: $pages
      img_url: $img_url
      genre: $genre
      publisher: $publisher
      authorname: $authorname
    ) 
    {
      id
    }
 }
`;

export const DELETE_BOOK = gql`
 mutation DeleteBook($id: Int!) {
  DeleteBook(
     id: $id
    ) 
    {
      id
    }
 }
 `;

export const ADD_USER = gql`
mutation AddUser(
    $UserName: String!
    $Password: String!
    $Email: String!
    $UserList: [String]
) {
  AddUser(
    UserName: $UserName
    Password: $Password
    Email: $Email
    UserList: $UserList
  )
   {
     id
   }
}
`;


export const ADD_BOOK_LIST = gql`
mutation AddBookList(
    $id: Int!
    $bookname: String!
) {
  AddBookList(
    id: $id
    bookname: $bookname
  )
   {
     id
   }
}
`;

export const DELETE_BOOK_LIST = gql`
  mutation DeleteBookList(
    $id: Int!
    $bookname: String!
  ) {
    DeleteBookList(
      id: $id
      bookname: $bookname
    ) {
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    DeleteUser(id: $id) {
      id
    }
  }
`;
