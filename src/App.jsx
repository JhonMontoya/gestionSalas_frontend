import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import { Booking } from "./pages/Booking";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
