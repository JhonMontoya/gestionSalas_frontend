import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Footer from './components/Footer'

// import Home from './pages/Home';
// import User from './pages/User';
import Admin from './pages/Admin'


function App(){
  return (
    <Router>      
      <Routes>
{/*         
        <Route path="/" element={<Home/>}/>
        <Route path="/user" element={<User/>}/> */}
        <Route path="/Admin" element={<Admin/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
