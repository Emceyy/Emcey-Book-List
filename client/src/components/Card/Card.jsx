import './Card.css';
import PropTypes from 'prop-types';
import { memo } from "react";
import { useMutation } from '@apollo/client';
import { DELETE_BOOK } from "../../GraphQL/Mutations"
import { LOAD_BOOKS } from "../../GraphQL/Queries";
 const Card = ( { data, querie } ) => {

  const [deleteBook] = useMutation(DELETE_BOOK,{

    refetchQueries: [
      { query: LOAD_BOOKS },
    ],
  });


    let method = "";

    const remove = async (id) => {
      try {
        const response = await deleteBook({
          variables: {
            id: id,
          },
        });
        console.log(response);
      } catch (err) {
        console.error(err);
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
              <div className='removee' key={val.id} onClick={() => remove(val.id)}>X</div>
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
              <div className='removee' key={val.id} onClick={() => remove(val.id)}>X</div>
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
                <div className='removee' key={val.id} onClick={() => remove(val.id)}>X</div>
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
  };