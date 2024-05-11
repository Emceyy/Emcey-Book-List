import { useState, useEffect } from 'react';
import{ ADD_BOOK } from '../../GraphQL/Mutations';
import { useMutation } from '@apollo/client'; 
import { LOAD_BOOKS } from "../../GraphQL/Queries";
import './Dialog.css';


 function Dialog () {


  const [addBook] = useMutation(ADD_BOOK, {

    refetchQueries: [

      { query: LOAD_BOOKS },
    ],
  });


    const [inputValues, setInputValues] = useState({
        author: '',
        bookTitle: '',
        pageCount: '',
        publisher: '',
        imageUrl: '',
        genre: '',
      });

      useEffect(() => {

        const openButton = document.getElementById('openDialog');
        const dialog = document.getElementById('dialog');
        const closeButton = document.getElementById('closeDialog');
      
      openButton.addEventListener('click', () => {
        dialog.style.display = 'block';
      });
      
      closeButton.addEventListener('click', () => {
        dialog.style.display = 'none';
      });
      
      }, []);
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      setInputValues({
        ...inputValues,
        [name]: value,
      });
    };
    
   
    
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await addBook({
          variables: {
            bookName: inputValues.bookTitle.toLocaleUpperCase(),
            pages: inputValues.pageCount,
            img_url: inputValues.imageUrl,
            genre: inputValues.genre,
            publisher: inputValues.publisher,
            authorname: inputValues.author,
          },
        });
        console.log(response)
        setInputValues({
          author: '',
          bookTitle: '',
          pageCount: '',
          publisher: '',
          imageUrl: '',
          genre: '',
        });
      } catch (err) {
        console.error(err);
      }
   };
    
  return (
    <div className='maindialog'>
    <button id="openDialog">Add New Book</button> 
    <div id="dialog" className="hidden">         
    <div className="dialog-container">
      <div className="dialog-content">
      <h2>New Book</h2>
      <form id="bookForm" onSubmit={handleFormSubmit} method='post'>
    <div className='inputscontainer'>
    <input
    type="text"
    name="author"
    placeholder=" Author"
    value={inputValues.author}
    onChange={handleChange}
    required
    />
    <input
    type="text"
    name="bookTitle"
    placeholder=" Book Name"
    value={inputValues.bookTitle}
    onChange={handleChange}
    required
    />
    <input
    type="text"
    name="pageCount"
    placeholder=" Pages"
    value={inputValues.pageCount}
    onChange={handleChange}
    />
    <input
    type="text"
    name="imageUrl"
    placeholder=" img url"
    value={inputValues.imageUrl}
    onChange={handleChange}
    />
    <div className='selectdialog'>
    
    <select name="publisher" className ='dialogselect' value={inputValues.publisher} onChange={handleChange}>
    <option  value="" disabled selected hidden >Publisher</option>
    <option value="İş Bankası">İş Bankası</option>
    <option value="İSKELE YAYINCILIK">İSKELE YAYINCILIK</option>
    <option value="KOLEKTİF KİTAP">KOLEKTİF KİTAP</option>
    <option value="JAGUAR KİTAP">JAGUAR KİTAP</option>
    <option value="ALFA YAYINLARI">ALFA YAYINLARI</option>
    </select>

    <select name="genre" className ='dialogselect' value={inputValues.genre} onChange={handleChange}>
    <option  value="" disabled selected hidden >Genre</option>
    <option value="article">article</option>
    <option value="story">story</option>
    <option value="novel">novel</option>
    <option value="poem">poem</option>
    <option value="essay">essay</option>
    
    </select>
    </div>
    </div>
    <div className="button-container">
    <button type="submit" id="submit">Submit</button>
    <button id="closeDialog">Close</button>
    </div>
    </form>
      </div>
    </div>
    </div>
    </div>
  )
}


export default Dialog;



