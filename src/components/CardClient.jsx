//eslint-disable-next-line
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  CircularProgress,
  Typography,
  Stack,
  Badge,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";

export default function Carousel(auth) {
  const user = auth.auth;

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      const datajson = await axios.get("http://localhost:3000/salas");
      const data = datajson.data;

      if (!data) {
        setLoading(false);
      }

      if (user) {
        //si user existe entonces filtra las disponibles
        const filterData = data.filter((hall) => hall.status === "disponible");
        setRooms(filterData);
      } else {
        //en caso de que user no exista (null) pasa todas las salas
        setRooms(data);
      }

      setLoading(false);
    };

    fetchRooms();
  }, [user]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto", mt: 4 }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          color: "#fd993b",
          fontFamily: "'serif',fantasy",
          fontWeight: "bold",
        }}
      >
        {user ? "Salas Disponibles" : "Salas"}
      </Typography>

      <Stack
        direction="row"
        spacing={4}
        justifyContent="center"
        flexWrap="wrap"
      >
        {rooms.map((room, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: "100%", sm: "48%", md: "30%" },
              marginBottom: "20px",
            }}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="200"
                image={room.url} // Asumiendo que cada imagen tiene una propiedad 'url'
                alt={`${room.name}`}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {room.name}
                </Typography>
                {user ? (
                  <>
                    <Typography variant="h6" component="div">
                      Capacidad: {room.capacity} <PersonIcon />
                    </Typography>
                    <Typography variant="h6" component="div">
                      Ubicación: {room.location}
                    </Typography>
                    <Badge
                      style={{ marginLeft: "35px", marginTop: "10px" }}
                      badgeContent={"Disponible"}
                      color="success"
                    />
                  </>
                ) : null}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}