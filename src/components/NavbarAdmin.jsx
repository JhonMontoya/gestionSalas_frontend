import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../assets/Logo.png";
import {
  AppBar,
  Box,
  Toolbar,
  Avatar,
  Tooltip,
  IconButton,
  MenuItem,
  Menu,
  Typography,
  Container,
} from "@mui/material";

const settings = [
  { key: 1, label: "Perfil" },
  { key: 2, label: "Cuenta" },
  { key: 3, label: "Iniciar sesion" },
  { key: 4, label: "Cerrar sesion" },
];

export default function ButtonAppBar({user, onSelectOption}) {
  const [userMenu, setUserMenu] = useState(null);
  const [salasMenu, setSalasMenu] = useState(null);

  const handleOpenUserMenu = (event) => {
    setUserMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenu(null);
  };

  {/*Manejasdores para salas */}
  const handleOpenSalasMenu = (event) => {
    setSalasMenu(event.currentTarget);
  };
  
  const handleCloseSalasMenu = () => {
    setSalasMenu(null);
  };
  
  const handleOptionClick = (option) => {
    onSelectOption(option);
    handleCloseSalasMenu();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#8787f5" }}>
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "95%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "40px" }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <img src={logo} style={{ width: "70px" }} />
              </Link>
              <IconButton
                style={{ borderRadius: "10px" }}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Typography sx={{ textAlign: "center" }}>
                  Reservas
                </Typography>
              </IconButton>

              <IconButton
                style={{ borderRadius: "10px" }}
                size="large"
                aria-label="salas menu"
                aria-controls="salas-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={handleOpenSalasMenu}
              >
                <Typography sx={{ textAlign: "center" }}>
                  Salas
                </Typography>
              </IconButton>

              <Menu
                id="salas-menu"
                anchorEl={salasMenu}
                open={Boolean(salasMenu)}
                onClose={handleCloseSalasMenu}
              >
              <MenuItem onClick={() => handleOptionClick("verSalas")}>Ver Salas</MenuItem>
              <MenuItem onClick={() => handleOptionClick("crearSala")}>Crear Sala</MenuItem>
              </Menu>
              
              <IconButton
                style={{ borderRadius: "10px" }}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Typography sx={{ textAlign: "center" }}>
                  Usuarios
                </Typography>
              </IconButton>
            </Box>
            <Tooltip title="Abrir configuración">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={user ? user.thumnail : <AccountCircleIcon />} />
                <Typography variant="p" sx={{fontSize: '15px'}}>
                {user.name}
                </Typography>
              </IconButton>
             
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={userMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(userMenu)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  disabled={user ? setting.key === 3 : setting.key === 4}
                  key={setting.key}
                  onClick={handleCloseUserMenu}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
          
        </Box>
      </Container>
    </AppBar>
  );
}