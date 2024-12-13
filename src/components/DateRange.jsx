//eslint-disable-next-line
import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DateRangeIcon from "@mui/icons-material/DateRange";
import dayjs from "dayjs";

const data = [
  { id: 1, name: "Evento 1", date: "2024-12-10" },
  { id: 2, name: "Evento 2", date: "2024-12-15" },
  { id: 3, name: "Evento 3", date: "2024-12-20" },
];

const DateRange = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [filteredData, setFilteredData] = useState(data);

  const handleFilter = () => {
    const [start, end] = dateRange;
    if (start && end) {
      const filtered = data.filter((item) =>
        dayjs(item.date).isBetween(start, end, null, "[]")
      );
      setFilteredData(filtered);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          padding: 0.9,
          borderRadius: 2,
          border: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: 400,
          height: 50,
        }}
      >
        <DateRangeIcon sx={{ fontSize: 18, color: "#6c63ff" }} />
        <Typography variant="subtitle1" sx={{ fontSize: 12 }}>
          Filtrar
        </Typography>

        <DateRangePicker
          value={dateRange}
          onChange={(newValue) => setDateRange(newValue)}
          renderInput={(startProps, endProps) => (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <TextField {...startProps} size="small" label="Inicio" sx={{ width: 100, fontSize: 12 }} />
              <TextField {...endProps} size="small" label="Fin" sx={{ width: 100, fontSize: 12 }} />
            </Box>
          )}
        />

        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ height: 30, fontSize: 10, padding: "0 8px" }}
          onClick={handleFilter}
        >
          Filtrar
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRange;
