import { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Alert,MenuItem } from '@mui/material';
import NavBar from '../components/Navbar';

function RoomManager() {
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    location: '',
    status: '',
    url: 'https://planner5d.com/blog/content/images/2022/06/sidekix-media-iu4K1XPnNAY-unsplash.jpg',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const addRoom = async () => {
    try {
      const response = await axios.post('http://localhost:3000/salas', formData);
      console.log('Sala creada con éxito:', response.data);
      setFormData({ name: '', capacity: '', location: '', status: '', url: '' });
      setErrorMessage('');
    } catch (error) {
      console.error('Error al crear la sala:', error.message);
      setErrorMessage('Error al crear la sala. Por favor, inténtalo de nuevo.');
    }
  };

  const handleAddRoom = async () => {
    try {
      await addRoom();
    } catch (error) {
      console.error('Error en handleAddRoom:', error.message);
    }
  };

  return (
    <Box>
      <NavBar />
      <Typography variant="h5" align="center" sx={{ mt: 2, fontWeight: 'bold' }}>
        Panel de Administración de Salas
      </Typography>
      <Box component="form" onSubmit={(e) => { e.preventDefault(); handleAddRoom(); }} sx={{ mt: 3, textAlign: 'center' }}>
        <TextField
          label="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          sx={{ m: 1, width: '300px' }}
          required
        />
        <TextField
          label="Capacidad"
          type="number"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
          sx={{ m: 1, width: '300px' }}
          required
        />
        <TextField
          label="Ubicación"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          sx={{ m: 1, width: '300px' }}
        />
        {/* <TextField
          label="Estado"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          sx={{ m: 1, width: '300px' }}
        /> */}
        <TextField
          label="Estado"
          select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          error={!formData.status}
          helperText={!formData.status ? 'Por favor, seleccione un estado':''}
          sx={{ m: 1, width: '300px' }}
          >
            <MenuItem value="disponible">Disponible</MenuItem>
            <MenuItem value="ocupado">Ocupado</MenuItem>
        </TextField>   
        <Button type="submit" variant="contained" color="primary" sx={{ m: 1 }}>
          Crear Sala
        </Button>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </Box>
  );
}
export default RoomManager;