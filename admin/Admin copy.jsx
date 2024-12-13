// import { useState } from 'react';
// import axios from 'axios';
// import { Box, Typography, TextField, Button, Alert } from '@mui/material';
// import NavBar from '../components/Navbar';

// function RoomManager() {
//   const [formData, setFormData] = useState({
//     name: '',
//     capacity: '',
//     location: '',
//     status: '',
//     url: 'https://planner5d.com/blog/content/images/2022/06/sidekix-media-iu4K1XPnNAY-unsplash.jpg',
//   });
//   const [errorMessage, setErrorMessage] = useState(''); // Estado para mostrar mensajes de error

//   const addRoom = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/salas', formData);
//       console.log('Sala creada con éxito:', response.data);
//       setFormData({ name: '', capacity: '', location: '', status: '', url: '' }); // Limpiar el formulario
//       setErrorMessage(''); // Ocultar el mensaje de error
//     } catch (error) {
//       console.error('Error al crear la sala:', error.message);
//       setErrorMessage('Error al crear la sala. Por favor, inténtalo de nuevo.');
//     }
//   };

//   const handleAddRoom = async () => {
//     try {
//       await addRoom();
//     } catch (error) {
//       console.error('Error en handleAddRoom:', error.message);
//     }
//   };

//   return (
//     <Box>
//       <NavBar />
//       <Typography variant="h5" align="center" sx={{ mt: 2, fontWeight: 'bold' }}>
//         Panel de Administración de Salas
//       </Typography>
//       <Box component="form" onSubmit={(e) => { e.preventDefault(); handleAddRoom(); }} sx={{ mt: 3, textAlign: 'center' }}>
//         {/* Campos del formulario */}
//         <Button type="submit" variant="contained" color="primary" sx={{ m: 1 }}>
//           Crear Sala
//         </Button>
//         {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
//       </Box>
//     </Box>
//   );
// }

// export default RoomManager;