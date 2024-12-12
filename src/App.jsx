import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from './components/Navbar';
import Footer from './components/Footer'

import Home from './pages/Home';
import Register from './pages/Register';
import { Halls } from "./pages/Halls";



function App(){
  return (
    <Router>
      <NavBar>
      </NavBar>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/halls" element={<Halls/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
