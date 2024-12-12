import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import NavBar from '../components/Navbar';

const RoomManager = () => {
  const [rooms, setRooms] = useState([]); // Lista de salas
  const [newRoom, setNewRoom] = useState(''); // Nombre de la nueva sala
  const [editingRoom, setEditingRoom] = useState(null); // Índice de la sala en edición
  const [editedRoomName, setEditedRoomName] = useState(''); // Nombre editado
  const [capacity, setCapacity] = useState(''); // Capacidad de la sala
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/admin');
      setRooms(response.data);
    } catch (error) {
      setError('Error al cargar las salas.'), error;
    } finally {
      setLoading(false);
    }
  };

  // Crear una nueva sala
  const handleAddRoom = async () => {
    if (newRoom.trim() === '' || capacity.trim() === '') return;
    try {
      const response = await axios.post('http://localhost:3000/admin', {
        roomName: newRoom.trim(),
        capacity: parseInt(capacity, 10),
      });
      if (response.status === 201) {
        setMessage('Sala creada con éxito.');
        setNewRoom('');
        setCapacity('');
        fetchRooms();
      }
    } catch (error) {
      setError('Error al crear la sala.'), error;
    }
  };

  // Eliminar una sala
  const handleDeleteRoom = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/${id}`);
      fetchRooms();
    } catch (error) {
      setError('Error al eliminar la sala.'), error;
    }
  };

  // Iniciar edición de una sala
  const handleEditRoom = (room) => {
    setEditingRoom(room.id);
    setEditedRoomName(room.name);
    setCapacity(room.capacity);
  };

  // Guardar cambios en la sala editada
  const handleSaveEdit = async () => {
    if (editedRoomName.trim() === '' || capacity.trim() === '') return;
    try {
      await axios.put(`http://localhost:3000/admin/${editingRoom}`, {
        name: editedRoomName.trim(),
        capacity: parseInt(capacity, 10),
      });
      setEditingRoom(null);
      setEditedRoomName('');
      setCapacity('');
      fetchRooms();
    } catch (error) {
      setError('Error al editar la sala.'), error;
    }
  };

  return (
    <Box>
      <NavBar />
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          fontSize: { xs: '1rem', sm: '2rem', md: '3rem' },
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        Panel de Administración
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          editingRoom ? handleSaveEdit() : handleAddRoom();
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          mt: 4,
        }}
      >
        <TextField
          label="Nombre de la Sala"
          value={editingRoom ? editedRoomName : newRoom}
          onChange={(e) => (editingRoom ? setEditedRoomName(e.target.value) : setNewRoom(e.target.value))}
          required
          fullWidth
          sx={{ maxWidth: '400px' }}
        />
        <TextField
          label="Capacidad"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
          fullWidth
          sx={{ maxWidth: '400px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          {editingRoom ? 'Guardar Cambios' : 'Crear Sala'}
        </Button>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          mt: 4,
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
        }}
      >
        Salas Disponibles
      </Typography>
      {loading ? (
        <Typography sx={{ textAlign: 'center', mt: 2 }}>Cargando...</Typography>
      ) : (
        <Box sx={{ mt: 2, maxWidth: '600px', margin: '0 auto' }}>
          {rooms.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Nombre</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Capacidad</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{room.name}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{room.capacity}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      <Button
                        onClick={() => handleEditRoom(room)}
                        variant="outlined"
                        color="primary"
                        sx={{ marginRight: '8px' }}
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleDeleteRoom(room.id)}
                        variant="outlined"
                        color="secondary"
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Typography sx={{ textAlign: 'center', mt: 2 }}>
              No hay salas disponibles.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default RoomManager;