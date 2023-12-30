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

