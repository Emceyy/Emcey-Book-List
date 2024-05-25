import { useEffect, useState } from 'react';
import Secondcontainer from '../../components/Secondcontainer/Secondcontainer';
import './Home.css';
export default function Home() {

    const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxValueY= -scrollY * 0.5;
 return (
    <div className='maincontainer'>
      <div className='bookscontainer'>
      <div className='textcontainer emcey'style={{ transform: `translateX(${-parallaxValueY}px)` }}>
        ESA 
      </div>
      <div className='textcontainer booklist'style={{ transform: `translateX(${parallaxValueY}px)` }}>
       BOOK LİST 
       </div>
      </div>
      <Secondcontainer /> 
    </div>
  )
}
