import React, { useState } from "react";
import NavBar from "../components/NavbarAdmin";
import CardAdmin from "../components/CardAdmin";
import CreateRoom from './CreateRoom';
import { Box } from "@mui/material";

export default function AdminPage({user}) {
    const [selectedOption, setSelectedOption]=useState('verSalas');
  return (
    <Box>
        <NavBar user={user} onSelectOption={setSelectedOption}></NavBar>
        {selectedOption==='verSalas'&&<CardAdmin/>}
        {selectedOption==='crearSala'&&<CreateRoom/>}
    </Box>
  );
}