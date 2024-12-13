import { useState } from "react";
import{Box} from '@mui/material'
import Login from "./Login";
import CardClient from "../components/CardClient";
import NavBarUser from "../components/NavbarClient";
import AdminInterface from "./AdminInterface";


export default function User() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    //localStorage.setItem("userToken", userData.token); 
  };

  if(!user){
    return(
      <Box>
        <Login onLogin={handleLogin}/>
      </Box>
    );
  }
  
  if(user.role==="Admin"){
    return(
      <AdminInterface user={user}></AdminInterface>
    );
  }

  return(
    <Box>
      <NavBarUser user ={user}></NavBarUser>
      <CardClient auth={user}></CardClient>
    </Box>
  );
};
