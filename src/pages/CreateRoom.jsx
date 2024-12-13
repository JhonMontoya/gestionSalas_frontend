import { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Alert, MenuItem } from '@mui/material';

const API_URL = 'http://localhost:3000/salas';

export default function CreateRoom() {
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    location: '',
    status: '',
    url: '',
  });

  // Función para crear las salas
  const addRoom = async () => {
    try {
      await axios.post(`${API_URL}`, formData);
      setFormData({ name: '', capacity: '', location: '', status: '', url: '' });
      setErrorMessage('');
    } catch (error) {
      console.error('Error al crear la sala:', error.message);
      setErrorMessage('Error al crear la sala. Por favor, inténtalo de nuevo.');
    }
  };

  // Llamado de la función para crear la sala desde el formulario
  const handleAddRoom = async () => {
    if (!formData.name.trim() || !formData.capacity.trim() || !formData.location.trim() || !formData.status.trim() || !formData.url.trim()) {
      setErrorMessage('Complete todos los campos');
      return;
    }
    if (isNaN(formData.capacity) || formData.capacity <= 0) {
      setErrorMessage('La capacidad debe ser un número positivo.');
      return;
    }
    setErrorMessage('');

    try {
      await addRoom();
    } catch (error) {
      console.error('Error al crear la sala', error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Crea tu sala
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddRoom();
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <TextField
          label="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          required
        />
        <TextField
          label="Capacidad"
          type="number"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
          fullWidth
          required
        />
        <TextField
          label="Ubicación"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          fullWidth
        />
        <TextField
          label="Estado"
          select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          fullWidth
          required
        >
          <MenuItem value="disponible">Disponible</MenuItem>
          <MenuItem value="ocupado">Ocupado</MenuItem>
        </TextField>
        <TextField
          label="URL de la Imagen"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          fullWidth
        />
        <Button type="submit" variant="contained" color="success" fullWidth>
          Crear Sala
        </Button>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </Box>
  );
}