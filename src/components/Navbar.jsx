//eslint-disable-next-line
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import DateRange from "./DateRange";

const settings = [
  { key: 1, label: "Perfil" },
  { key: 2, label: "Cuenta" },
  { key: 3, label: "Iniciar sesion" },
  { key: 4, label: "Cerrar sesion" },
];

export default function ButtonAppBar() {
  const navigate = useNavigate();
  //aqui se debe setear el usuario que este logeado.
  //manejarlo con un estado como redux o sustand o con un localStorage.
  const user = {
    id: "674d47dcc5d0b949e5fe20f1",
    name: "Duvan Camilo Zapata",
    email: "prueba@email.com",
    thumnail:
      "https://media.glamour.mx/photos/65b096f13756393e0200c63d/16:9/w_1920,c_limit/que-significa-tu-foto-de-perfil.jpg",
    role: "single",
    //password: "$2a$10$PDH8l8ZLpdiZJtbKK3cA/.iXQcvBhSF7mb4deMswd/aeHGIp0lpWC",
    v: 0,
  };

  const [userMenu, setUserMenu] = useState(null);

  const handleOpenUserMenu = (event) => {
    setUserMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenu(null);
  };

  const goToBooking = () => {
    navigate("/booking");
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
                onClick={goToBooking}
              >
                <Typography sx={{ textAlign: "center" }}>
                  Crear reservas
                </Typography>
              </IconButton>
            </Box>
            <Box>
              <DateRange />
            </Box>
            <Tooltip title="Abrir configuración">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={user ? user.thumnail : <AccountCircleIcon />} />
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
