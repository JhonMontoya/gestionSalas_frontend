//eslint-disable-next-line
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DateRangeIcon from "@mui/icons-material/DateRange";
//import dayjs from "dayjs";

const DateRange = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  //const [filteredData, setFilteredData] = useState([]);

  //const handleFilter = () => {
  //const [start, end] = dateRange;
  //if (start && end) {
  //ese data serian las bookins
  //const filtered = data.filter((item) =>
  //dayjs(item.date).isBetween(start, end, null, '[]')
  //);
  //setFilteredData(filtered);
  //}
  //};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          maxWidth: 300,
        }}
      >
        <Typography variant="h5" textAlign="center">
          <DateRangeIcon />
        </Typography>

        <DateRangePicker
          value={dateRange}
          onChange={(newValue) => setDateRange(newValue)}
          renderInput={(startProps, endProps) => (
            <>
              <Box>
                <startProps.TextField {...startProps} label="Fecha Inicio" />
                <endProps.TextField {...endProps} label="Fecha Fin" />
              </Box>
            </>
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRange;
