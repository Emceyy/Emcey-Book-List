import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_BOOKS,
  LOAD_BOOKS_BY_PUBLISHER,
  LOAD_BOOKS_BY_GENRE,
  LOAD_BOOKS_BY_AUTHOR,
  LOAD_BOOKS_BY_BookName,
  LOAD_USER} from "../../GraphQL/Queries";
import  Card  from '../Card/Card'
import { useLazyQuery } from '@apollo/client';
import PropTypes from 'prop-types';


function GetBook( {getbook, getpublisher, getgenre, getauthor, getbookname, getuserbooks, isLoggedIn, user} ) {

 const[data, setdata] = useState({})
 const[querie, setquerie] = useState(0)

 const { data:data1 } = useQuery(LOAD_BOOKS);

 const { data:data2 } = useQuery(LOAD_BOOKS_BY_PUBLISHER, {
  variables: { publisher: getpublisher },
 });

 const { data:data3 } = useQuery(LOAD_BOOKS_BY_GENRE, {
  variables: { genre: getgenre},
 });

 const { data:data4 } = useQuery(LOAD_BOOKS_BY_AUTHOR, {
   variables: { AuthorName: getauthor},
  });

  const { data:data5 } = useQuery(LOAD_BOOKS_BY_BookName, {
   variables: { BookName: getbookname || "CRIME AND PUNISHMENT"},
  });

  const { data: userData } = useQuery(LOAD_USER, {
   variables: {
     Email: getuserbooks?.Email,
     Password: getuserbooks?.Password,
   },
 });
 
 
 const [bookDataList, setBookDataList] = useState([]);

  const [loadBookData, { data: bookData }] = useLazyQuery(LOAD_BOOKS_BY_BookName);

  const fetchBookData = async () => {

    if (!userData || !userData.getUser || !userData.getUser.UserList) {
      return;
    }
   const list = userData.getUser.UserList;
   const bookPromises = list.map((bookName) =>
     loadBookData({ variables: { BookName: bookName } }).then((data) => data.data.getBookByName)
   );
 
   try {
     const bookDataList = [];
     const results = await Promise.all(bookPromises);
     results.forEach((bookData) => {
       const existingBookIndex = bookDataList.findIndex(
         (existingBook) => existingBook.id === bookData.id
       );
       if (existingBookIndex === -1) {
         bookDataList.push(bookData);
       }
     });
     setBookDataList(bookDataList);
   } catch (error) {
     console.error('Error fetching book data:', error);
   }
 };

  useEffect(() => {
    fetchBookData();
  }, [userData]);

  let data5_array;

  if(data5){
    data5_array = Object.values(data5);
  }

 useEffect(() => {
  if(getbook === 2 && data2){
     setdata(data2)
     setquerie(2)
  }else if(getbook === 1 && data1){
     setdata(data1)
     setquerie(1)
  }else if(getbook === 3 && data3){
    setdata(data3)
    setquerie(3)
  }else if(getbook === 4 && data4){
   setdata(data4)
   setquerie(4)
  }else if(getbook === 5 && data5){
   setdata(data5_array)
   setquerie(5)
  }else if(getbook === 6 && bookData){
    setdata(bookDataList)
    setquerie(5)
  }
  else{
     setdata(null)
     setquerie(0)
  }
 },[getbook,data4,data3,data2,data5,data1,bookData,bookDataList])

 

 return(
    <Card data={data} querie={querie}
     isLoggedIn={isLoggedIn} user={user}
     getuserbooks={getuserbooks}
     bookDataList={bookDataList}
     />
 )
}

export default (GetBook);

GetBook.propTypes = {
  getbook: PropTypes.any.isRequired,
  getpublisher: PropTypes.any.isRequired,
  getgenre: PropTypes.any.isRequired,
  getauthor: PropTypes.any.isRequired,
  getbookname: PropTypes.any.isRequired,
  getuserbooks: PropTypes.any.isRequired,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.any
};