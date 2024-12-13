import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import NavBar from '../components/Navbar';

const RoomManager = () => {
  const [rooms, setRooms] = useState([]); // Lista de salas
  // Nombre de la nueva sala
  const [editingRoom, setEditingRoom] = useState(null); // Índice de la sala en edición
  const [editedRoomName, setEditedRoomName] = useState(''); // Nombre editado
  const [nameRoom, setNameRooom] = useState('')
  const [capacity, setCapacity] = useState(''); // Capacidad de la sala
  const [status, setStatus ] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [newRoom, setNewRoom] = useState({
    name: nameRoom,
    capacity: capacity,
    location: location
    status: status
  });


  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/salas');
      setRooms(response.data);
    } catch (error) {
      setError('Error al cargar las salas.'), error;
    } finally {
      setLoading(false);
    }
  };

  // Crear una nueva sala
  const handleAddRoom = async () => {
    addRoom(newRoom);
  };

  // Eliminar una sala
  const handleDeleteRoom = async () => {
    try {
      await axios.delete(`http://localhost:3000/salas/${room.id}`);
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
    setStatus(room.status);
    setLocation(room.location);
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
          {/*onChange={(e) => (editingRoom ? setEditedRoomName(e.target.value) : setNameRoom(e.target.value))}*/}
          onChange={(e) =>  setNameRoom(e.target.value)}
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
        <TextField
          label="Status"
          type="number"
          value={capacity}
          onChange={(e) => setStatus(e.target.value)}
          required
          fullWidth
          sx={{ maxWidth: '400px' }}
        />
        <TextField
          label="Location"
          type="number"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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
                    <td style={{ border: '1px solid black', padding: '8px' }}>{room.status}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{room.location}</td>
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

// src/api/roomService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/salas';

// Fetch all rooms from the server
const fetchRooms = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error al cargar las salas.');
  }
};

// Add a new room
 const addRoom = async (newRoom) => {
  try {
    const response = await axios.post(API_URL, newRoom);
    return response;
  } catch (error) {
    throw new Error('Error al crear la sala.');
  }
};

// Delete a room by ID
 const deleteRoom = async (roomId) => {
  try {
    await axios.delete(`${API_URL}/${roomId}`);
  } catch (error) {
    throw new Error('Error al eliminar la sala.');
  }
};

// Update a room by ID
const updateRoom = async (roomId, updatedRoom) => {
  try {
    await axios.put(`${API_URL}/${roomId}`, updatedRoom);
  } catch (error) {
    throw new Error('Error al editar la sala.');
  }
};

/* --------------------------------------------------------------------------------------- */
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import NavBar from '../components/Navbar';
import { fetchRooms, addRoom, deleteRoom, updateRoom } from '../api/roomService';

const RoomManager = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({ name: '', capacity: '', location: '', status: '' });
  const [editingRoom, setEditingRoom] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      setRooms(await fetchRooms());
    } catch {
      setError('Error al cargar las salas.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRoom) {
        await updateRoom(editingRoom, formData);
        setMessage('Sala actualizada con éxito.');
      } else {
        await addRoom(formData);
        setMessage('Sala creada con éxito.');
      }
      resetForm();
      loadRooms();
    } catch {
      setError('Error al procesar la solicitud.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRoom(id);
      setMessage('Sala eliminada con éxito.');
      loadRooms();
    } catch {
      setError('Error al eliminar la sala.');
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room.id);
    setFormData(room);
  };

  const resetForm = () => {
    setEditingRoom(null);
    setFormData({ name: '', capacity: '', location: '', status: '' });
    setMessage('');
    setError('');
  };

  return (
    <Box>
      <NavBar />
      <Typography variant="h5" align="center" sx={{ mt: 2, fontWeight: 'bold' }}>
        Panel de Administración de Salas
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, textAlign: 'center' }}>
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
        <TextField
          label="Estado"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          sx={{ m: 1, width: '300px' }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ m: 1 }}>
          {editingRoom ? 'Guardar Cambios' : 'Crear Sala'}
        </Button>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Typography variant="h6" align="center" sx={{ mt: 3 }}>
        Salas Disponibles
      </Typography>
      {loading ? (
        <Typography align="center">Cargando...</Typography>
      ) : (
        <Box sx={{ mt: 2, mx: 'auto', maxWidth: '600px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Capacidad</th>
                <th>Ubicación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.name}</td>
                  <td>{room.capacity}</td>
                  <td>{room.location}</td>
                  <td>{room.status}</td>
                  <td>
                    <Button onClick={() => handleEdit(room)} size="small" sx={{ mr: 1 }}>
                      Editar
                    </Button>
                    <Button onClick={() => handleDelete(room.id)} color="secondary" size="small">
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
    </Box>
  );
};

export default RoomManager;