import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from './components/Footer'

import Home from './pages/Home';
import User from './pages/User';


import { useState, useEffect } from 'react';

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    { 
      url: 'https://images.pexels.com/photos/16120232/pexels-photo-16120232/free-photo-of-mesas-diseno-interior-lugar-de-un-evento.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      alt: 'Sala de eventos'
    },
    { 
      url: 'https://www.optixapp.com/wp-content/uploads/2023/09/Koworks-Coworking-Meeting-Room.webp', 
      alt: 'Sala de coworking'
    },
    { 
      url: 'https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      alt: 'Sala de reuniones'
    },
  ];

  const handleImageClick = (index) => {
    setActiveIndex(index);
    window.open('/reservas', '_blank');
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextClick();
    }, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Router>      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/user" element={<User/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;