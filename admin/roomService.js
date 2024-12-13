/* import axios from 'axios';

const API_URL = 'http://localhost:3000/salas';

export const fetchRooms = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addRoom = async (room) => {
  const response = await axios.post(API_URL, room);
  return response.data;
};

export const deleteRoom = async (roomId) => {
  await axios.delete(`${API_URL}/${roomId}`);
};

export const updateRoom = async (roomId, room) => {
  await axios.put(`${API_URL}/${roomId}`, room);
};
 */