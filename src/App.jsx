import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Footer from './components/Footer'

import Home from './pages/Home';
import Login from './pages/Login';

function App(){
  return (
    <Router>      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path = "/acces" element={<Login/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
