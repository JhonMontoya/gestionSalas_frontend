import * as React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import logo from "../assets/Logo.png";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: "#8787f5"}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
          <Link to = "/" style={{textDecoration:'none'}}>
          <img
            src={logo}
            style={{width: '70px'}}
            />
          </Link>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<AccountCircleIcon />}
            >
            <Link to = "/user" style={{textDecoration:'none'}}>
              Acceder
            </Link>
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
