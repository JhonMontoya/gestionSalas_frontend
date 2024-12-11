import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import "./components.css"

const options = ['Sala 1', 'Sala 2'];


export default function SearchBar() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            sx={{ width: 400}}
            renderInput={(params) => <TextField {...params} label="Busqueda por salas" />}
        />
    </div>
  );
}


