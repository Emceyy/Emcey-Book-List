import './Card.css';
import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { ADD_BOOK_LIST, DELETE_BOOK_LIST, DELETE_BOOK } from "../../GraphQL/Mutations"
import { LOAD_USER, LOAD_BOOKS} from "../../GraphQL/Queries";
const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;


 const Card = ( { data, querie, isLoggedIn, user, getuserbooks, bookDataList} ) => {

  const [addBookList] = useMutation(ADD_BOOK_LIST,{
    refetchQueries: [
      { query: LOAD_USER, variables: { Email: getuserbooks.Email,
         Password: getuserbooks.Password}},
    ],
  });

  const [deleteBookList] = useMutation(DELETE_BOOK_LIST,{
    refetchQueries: [
      { query: LOAD_USER, variables: { Email: getuserbooks.Email,
         Password: getuserbooks.Password}},
    ],
  });

  const [DeleteBook] = useMutation(DELETE_BOOK,{
    refetchQueries: [
      { query: LOAD_BOOKS}
    ],
  });



  const [ids, setIds] = useState([]);


  useEffect(() => {
    if (bookDataList) { 
      const bookIds = bookDataList.map((book) => book.id); setIds(bookIds); }

    if (data && data.getAllBooks && getuserbooks.Email == adminEmail && getuserbooks.Password == adminPassword)
       {
      const adminids = data.getAllBooks.map((book) => book.id);
      setIds(adminids);
    }
    if (bookDataList && getuserbooks && getuserbooks.Email ==! adminEmail && getuserbooks.Password ===! adminPassword) {
      const bookIds = bookDataList.map(book => book.id);
      setIds(bookIds);
     
    }
  }, [data, bookDataList]);


  

    let method = "";

    const addOrDeleteBook = async (id, bookName) => {
      if(isLoggedIn){
        if(data && data.getAllBooks && getuserbooks.Email == adminEmail && getuserbooks.Password == adminPassword){
          try {
            await DeleteBook({
              variables: {
                id: parseInt(id),
              },
            });
          } catch (err) {
            console.error(err);
          }
        }
        if (ids.includes(id)) {
          setIds((pre) => pre.filter((previd) => previd !== id))
          try {
            await deleteBookList({
              variables: {
                id: user,
                 bookname: bookName,
              },
            });
          } catch (err) {
            console.error(err);
          }
        } else {
          setIds((pre) => [...pre, id]);
          try {
            await addBookList({
              variables: {
                id: user,
                bookname: bookName,
              },
            });
          } catch (err) {
            console.error(err);
          }
        }
      }else{
        alert("please login")
      }
    };
   
   if(querie === 1 && data){
    method = "getAllBooks"
   }if(querie === 2 && data){
    method = "getBookByPublisher"
   }if(querie === 3 && data){
    method = "getBookByGenre"
   }if(querie === 5 && data){

    return ( 
      <div className="cards">
        {data && data.map((val) => ( 
          <div key={val.id} className="card">
         
              <div className="img_url">
                <img alt="img" draggable="false" key={val.id} src={val.img_url} className="img"></img>
              </div>
              <div className="information">
              <div className='removee' key={val.id} onClick={() => addOrDeleteBook(val.id, val.bookName)}>
  {ids.includes(val.id) ? "X" : "✔"}
</div>
              <div className="book">
              <div className="heding">
              Book Name:
              </div>
                <div>
                {val.bookName.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase())}
                </div> 
              </div>
              <div className="book">
              <div className="heding">
              Author Name:
              </div>
                <div>
                {val.authorname}
                </div> 
              </div>
              <div className="book">
              <div className="heding">
              Pages:
              </div>
                <div>
                {val.pages}
                </div> 
              </div>
              <div className="book">
              <div className="heding">
              Genre:
              </div>
                <div>
                {val.genre}
                </div> 
              </div>
              <div className="book">
              <div className="heding">
              Publisher:
              </div>
                <div>
                {val.publisher}
                </div> 
              </div>
              </div>
            </div>
        )) }
      </div>
   );
   }
   if(querie === 4 && data){
    return ( 
      <div className="cards">
        {data && data.getAuthorByName ? data.getAuthorByName.Books.map((val) => ( 
          <div key={val.id} className="card">
  
              <div className="img_url">
                <img alt="img"  draggable="false" key={val.id} src={val.img_url} className="img"></img>
              </div>
              <div className="information">
              <div className='removee' key={val.id} onClick={() => addOrDeleteBook(val.id, val.bookName)}>
  {ids.includes(val.id) ? "X" : "✔"}
</div>
              <div className="book">
              <div className="heding">
              Book Name:
              </div>
                <div>
                {val.bookName.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase())}
                </div> 
              </div>
              <div className="book">
              <div className="heding">
              Author Name:
              </div>
                <div>
                {val.authorname}
                </div> 
              </div>
              <div className="book">
              <div className="heding">
              Pages:
              </div>
                <div>
                {val.pages}
                </div> 
              </div>
              <div className="book">
              <div className="heding">
              Genre:
              </div>
                <div>
                {val.genre}
                </div> 
              </div>
              <div className="book">
              <div className="heding">
              Publisher:
              </div>
                <div>
                {val.publisher}
                </div> 
              </div>
              </div>
            </div>
        )) : null}
      </div>
   );
   }
    
    return ( 
        <div className="cards">
          {data && data[method] ? data[method].map((val) => ( 
            <div key={val.id} className="card">
    
                <div className="img_url">
                  <img alt="img"  draggable="false" key={val.id} src={val.img_url} className="img"></img>
                </div>
                <div className="information">
                <div className='removee' key={val.id} onClick={() => addOrDeleteBook(val.id, val.bookName)}>
  {ids.includes(val.id) ? "X" : "✔"}
</div>
                <div className="book">
                <div className="heding">
                Book Name:
                </div>
                  <div>
                  {val.bookName.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase())}
                  </div> 
                </div>
                <div className="book">
                <div className="heding">
                Author Name:
                </div>
                  <div>
                  {val.authorname}
                  </div> 
                </div>
                <div className="book">
                <div className="heding">
                Pages:
                </div>
                  <div>
                  {val.pages}
                  </div> 
                </div>
                <div className="book">
                <div className="heding">
                Genre:
                </div>
                  <div>
                  {val.genre}
                  </div> 
                </div>
                <div className="book">
                <div className="heding">
                Publisher:
                </div>
                  <div>
                  {val.publisher}
                  </div> 
                </div>
                </div>
              </div>
          )) : null}
        </div>
     );
}

export default memo(Card);

Card.propTypes = {
    data: PropTypes.any.isRequired,
    querie: PropTypes.any.isRequired,
    isLoggedIn: PropTypes.bool,
    user: PropTypes.any.isRequired,
    getuserbooks: PropTypes.any.isRequired,
    bookDataList: PropTypes.any.isRequired,
  };