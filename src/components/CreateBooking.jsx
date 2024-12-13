/*eslint-disable*/
import React from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Alert,
} from "@mui/material";

const CreateBooking = ({ onSubmit, message, states, actions, halls }) => {
  console.log(halls);

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        maxWidth: 500,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 4,
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        Crear Reserva
      </Typography>
      {message && <Alert severity="info">{message}</Alert>}

      <TextField
        label="ID Sala"
        select
        value={states.hallSelected}
        onChange={(e) => actions.setHallSelected(e.target.value)}
        required
      >
        {halls.map((hall) => (
          <MenuItem value={hall.id}>{hall.name}</MenuItem>
        ))}
      </TextField>

      <TextField
        label="Fecha de Inicio"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={states.dateStart}
        onChange={(e) => actions.setDateStart(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Fecha de Fin"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={states.dateEnd}
        onChange={(e) => actions.setDateEnd(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Estado"
        select
        value={states.status}
        onChange={(e) => actions.setStatus(e.target.value)}
        fullWidth
      >
        <MenuItem value="activo">Activo</MenuItem>
        <MenuItem value="inactivo">Inactivo</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Crear Reserva
      </Button>
    </Box>
  );
};

export default CreateBooking;
