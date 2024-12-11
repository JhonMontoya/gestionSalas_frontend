import React from "react";

import { AppBar, Toolbar, Button, Box, Button} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import "./components.css";
import logo from '../assets/Logo.png';
import SearchBar from "./SearchBar";

export default function NavBar() {
    return (
        <AppBar position="static" className="navbar">
            <Toolbar className="navbar-toolbar">
                <Box className="navbar-logo">
                    <img
                        src={logo}
                        alt="Logo"
                        className="logo-image"
                    />
                </Box>
                <SearchBar />
                <Box className="navbar-buttons">
                    <Button color="inherit" className="navbar-button">
                        Iniciar Sesión
                    </Button>
                    <Button color="inherit" variant="outlined" className="navbar-button">
                        Registro
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
