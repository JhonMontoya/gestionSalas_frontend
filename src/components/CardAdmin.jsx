import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardActions, CardContent, CardMedia, Box, CircularProgress, Typography, Stack, Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const API_URL="http://localhost:3000/salas";

export default function CardAdmin() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(API_URL);
        setRooms(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las salas:", error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleDeleteRoom = async(roomId)=>{
   
    try {
      const response = await axios.delete(`${API_URL}/${roomId}`);
      console.log(response.data);
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId));
      alert("Sala eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar la sala:", error);
      alert("Error al eliminar la sala. Intente nuevamente.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto", mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{color: "#fd993b", fontFamily:"'serif',fantasy", fontWeight: "bold"}}>
          Salas
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
                  <Typography variant="h6" component="div">
                    {room.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" startIcon={<CloudUploadIcon />} size="medium">Editar</Button>
                  <Button variant="outlined" startIcon={<DeleteIcon />} size="medium" color="error" onClick={() =>{ handleDeleteRoom(room._id)}} >Eliminar</Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Stack>
      </Box>
  </Box>
  );
}
