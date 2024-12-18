//eslint-disable-next-line
import React from "react";
import {Box, Typography} from '@mui/material';
import Card from "../components/Card";
import NavBar from '../components/Navbar';

export default function Home() {
  return (
     <Box>
      <NavBar>
      </NavBar>
     <Typography variant="h5" 
     sx={{
      textAlign: 'center',
      fontSize: { xs: "1rem", sm: "2rem", md: "3rem" },
      fontFamily:  "'Comic Sans MS', cursive, sans-serif",
      fontWeight: "bold",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)"
      }}>
         Bienvenido a Event Hub
     </Typography>
     <Card />
   </Box>
  );    
}
