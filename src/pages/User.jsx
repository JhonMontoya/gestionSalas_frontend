import { useState } from "react";
import Link from "react-router-dom";
import{Box} from '@mui/material'
import Login from "./Login";
import Carousel from "../components/Carousel";
import NavBarUser from "../components/NavbarUser";;

export default function User() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    //localStorage.setItem("userToken", userData.token); 
  };

  return (
    <Box>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <NavBarUser user ={user}></NavBarUser>
          <Carousel auth={user}></Carousel>
          {user.role === 'Admin' && < Link to ='/Admin'></Link>}
        </>
      )}
    </Box>
      
  );
};
