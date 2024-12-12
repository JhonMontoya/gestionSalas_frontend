<<<<<<< HEAD
import { useState, useEffect } from 'react';
import Registro from './registro';
import IniciarSesion from './IniciarSesion';

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showIniciarSesion, setShowIniciarSesion] = useState(false);

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

  const handleRegistroClick = () => {
    setShowRegistro(true);
  };

  const handleIniciarSesionClick = () => {
    setShowIniciarSesion(true);
  };

  const handleVolverClick = () => {
    setShowIniciarSesion(false);
    setShowRegistro(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextClick();
    }, 15000);
    return () => clearInterval(intervalId);
  }, []);

  if (showIniciarSesion) {
    return <IniciarSesion onVolverClick={handleVolverClick} />;
  }

  if (showRegistro) {
    return <Registro onVolverClick={handleVolverClick} />;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-blue-500 text-white p-4">
        <div className="flex items-center">
          <img src="../img/Logo.png" alt="logo" className='w-14' />
        </div>
        <input
          type="search"
          placeholder="Buscar salas"
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pl-10 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        />
        <div className="flex items-center">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
            onClick={handleIniciarSesionClick}
          >
            Iniciar sesión
          </button>
          <button 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={handleRegistroClick}
          >
            Registrarse
          </button>
        </div>
      </nav>

      {/* Carrusel */}
      <div className="flex-1 flex justify-center items-center">
        <div className="flex justify-center items-center w-full max-w-[1600px] mx-auto px-1 relative">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer" onClick={handlePrevClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="w-full h-screen bg-cover bg-center rounded-lg cursor-pointer mb-4" style={{ backgroundImage: `url(${images[activeIndex].url})` }} onClick={() => handleImageClick(activeIndex)} title={images[activeIndex].alt} />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer" onClick={handleNextClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 p-4 text-center">
        <p>Nuestra información de contacto:</p>
        <p>Teléfono: 123456789</p>
        <p>Correo electrónico: ejemplo@ejemplo.com</p>
        <p>Dirección: Calle Ejemplo, 123</p>
      </footer>
    </div>
=======
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import NavBar from './components/Navbar';
import Footer from './components/Footer'

import Home from './pages/Home';
import Register from './pages/Register';


function App(){
  return (
    <Router>
      <NavBar>
      </NavBar>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <Footer/>
    </Router>
>>>>>>> jhonathan
  );
};

export default App;
