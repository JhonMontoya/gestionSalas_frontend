import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Box, CircularProgress, Typography, Stack } from "@mui/material";

export default function Carousel() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/salas");
        setRooms(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las salas:", error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto", mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{color: "#fd993b", fontFamily:"'serif',fantasy", fontWeight: "bold"}}>
        Nuestras Salas
      </Typography>

       <Stack direction="row" spacing={4} justifyContent="center" flexWrap="wrap">
        {rooms.map((room, index) => (
          <Box key={index} sx={{ width: { xs: "100%", sm: "48%", md: "30%" }, marginBottom: "20px" }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="200"
                image={room.url} 
                alt={`${room.name}`}
              />
              <CardContent>
                <Typography variant="h6" component="div" sx={{textAlign: 'center', color:"#f58405"
                }}>
                  {room.name}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
  