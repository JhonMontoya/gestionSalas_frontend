import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Footer from './components/Footer'

import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User'

function App(){
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
