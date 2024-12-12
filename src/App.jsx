import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Footer from './components/Footer'

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App(){
  return (
    <Router>      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path = "/acces" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
