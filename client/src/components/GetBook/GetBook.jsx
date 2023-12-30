import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_BOOKS } from "../../GraphQL/Queries";
import { LOAD_BOOKS_BY_PUBLISHER } from "../../GraphQL/Queries";
import { LOAD_BOOKS_BY_GENRE } from "../../GraphQL/Queries";
import { LOAD_BOOKS_BY_AUTHOR } from "../../GraphQL/Queries";
import { LOAD_BOOKS_BY_BookName } from "../../GraphQL/Queries";
import { memo } from "react";
import  Card  from '../Card/Card'
import PropTypes from 'prop-types';


function GetBook( {getbook, getpublisher, getgenre, getauthor, getbookname} ) {

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
  }
  else{
     setdata(null)
     setquerie(0)
  }
 },[getbook,data4,data3,data2,data5,data1])

 

 return(
    <Card data={data} querie={querie} />
 )
}

export default memo(GetBook);

GetBook.propTypes = {
  getbook: PropTypes.any.isRequired,
  getpublisher: PropTypes.any.isRequired,
  getgenre: PropTypes.any.isRequired,
  getauthor: PropTypes.any.isRequired,
  getbookname: PropTypes.any.isRequired,
};