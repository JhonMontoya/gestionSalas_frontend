import { useEffect, useState } from "react";
import axios from "axios";
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

export default function CardAdmin() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);

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

  const handleSelectRoom = (room) => {
    setSelectedRoom(room === selectedRoom ? null : room); // Toggle room selection
  };

  return (
    <Box>
      <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto", mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: "#fd993b", fontFamily: "'serif',fantasy", fontWeight: "bold" }}>
          Salas
        </Typography>

        <Stack direction="row" spacing={4} justifyContent="center" flexWrap="wrap">
          {rooms.map((room, index) => {
            const isSelected = selectedRoom === room;
            const badgeColor = room.status === "Disponible" ? "success" : "error";
            const textColor = room.status === "Disponible" ? "red" : "green";
            const backgroundColor = isSelected ? "blue" : "transparent";

            return (
              <Box 
                key={index} 
                sx={{ width: { xs: "100%", sm: "48%", md: "30%" }, marginBottom: "20px" }}
                onClick={() => handleSelectRoom(room)} // Select room on click
                style={{ backgroundColor }}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={room.url}
                    alt={`${room.name}`}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" style={{ color: textColor }}>
                      {room.name}
                    </Typography>
                    <Typography variant="h6" component="div" style={{ color: textColor }}>
                      Capacidad: {room.capacity} <PersonIcon />
                    </Typography>
                    <Typography variant="h6" component="div" style={{ color: textColor }}>
                      Ubicación: {room.location}
                    </Typography>
                    <Badge
                      style={{ marginLeft: "35px", marginTop: "10px" }}
                      badgeContent={room.status}
                      color={badgeColor}
                    />
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
