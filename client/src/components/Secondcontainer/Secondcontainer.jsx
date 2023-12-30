import { useState} from 'react';
import './Secondcontainer.css';
import { memo } from "react";
import GetBook from '.././GetBook/GetBook';
import Dialog from "../Dialog/Dialog";

function Secondcontainer(){

  const [getbook, setgetbook] = useState(0);
  const [publisher, setPublisher] = useState(0);
  const [genre, setGenre] = useState(0);
  const [author, setAuthor] = useState(0);
  const [search, setsearch] = useState("");
  const [value, setvalue] = useState("");

  const handleChange = (e) => {
    setsearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setvalue(search.toLocaleUpperCase())
    console.log(search.toLocaleUpperCase())
    setgetbook(5);
    setsearch("");
  };

  const handlePublisherChange = (event) => {
    setPublisher(event.target.value);
    setgetbook(2);
    setGenre(0);
    setAuthor(0);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
    setgetbook(3);
    setPublisher(0);
    setAuthor(0);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
    setgetbook(4);
    setPublisher(0);
    setGenre(0);
  };


const getallbooks = () => {
  setgetbook(1);
  setPublisher(0);
  setAuthor(0);
  setGenre(0);
};

  return (
    <div className='secondconatiner'>

        <div className='searchandoptions'>

        <form onSubmit={handleSubmit} className='formsearchandoptions'>
        <input
          type="text"
          id="arama"
          placeholder="  🔎"
          className="searchinput"
          value={search}
          onChange={handleChange}
        />
      </form>

          <select defaultValue={publisher} onChange={handlePublisherChange} className ='optionsmenu'>
          <option  value="0" disabled  hidden>Publisher</option>
            <option value="İş Bankası">İş Bankası</option>
            <option value="İSKELE YAYINCILIK">İskele Yayıncılık</option>
            <option value="KOLEKTİF KİTAP">Kolektif Kitap</option>
            <option value="JAGUAR KİTAP">JAGUAR KİTAP</option>
            <option value="ALTIN KİTAPLAR">ALTIN KİTAPLAR</option>
            <option value="ALFA YAYINLARI">ALFA YAYINLARI</option>
          </select>

          <select defaultValue={genre} onChange={handleGenreChange} className ='optionsmenu'>
          <option  value="0" disabled  hidden>Genre</option>
            <option value="Drama">Drama</option>
            <option value="History">History</option>
            <option value="Evolution">Evolution</option>
            <option value="Science">Science</option>
            <option value="Comedy">Comedy</option>
          </select>

          <select  defaultValue={author} onChange={handleAuthorChange} className ='optionsmenu'>
          <option  value="0" disabled  hidden>Author</option>
            <option value="Fyodor Dostoyevski">Fyodor Dostoyevski</option>
            <option value="Lev N. Tolstoy">Lev N. Tolstoy</option>
            <option value="Yuval Noah Harari">Yuval Noah Harari</option>
            <option value="Yu Hua">Yu Hua</option>
            <option value="Carl Sagan">Carl Sagan</option>
            <option value="Douglas Adams">Douglas Adams</option>
          </select>
          <button className="mybooklist" onClick={getallbooks}>My Book List</button> 
          <div className='dialog'>
          <Dialog />
          </div>
        </div>
        <GetBook
          getbook={getbook}
          getpublisher={publisher}
          getgenre={genre}
          getauthor={author}
          getbookname={value}
         />
      </div>
  )
}

export default memo(Secondcontainer)



