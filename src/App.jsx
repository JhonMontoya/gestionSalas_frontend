import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from './components/Footer'

import Home from './pages/Home';
import { Halls } from "./pages/Halls";


function App(){
  return (
    <Router>      
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
