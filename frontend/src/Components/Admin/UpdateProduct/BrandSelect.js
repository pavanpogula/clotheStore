import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField,  } from '@mui/material';
import { getAllBrands } from '../../../features/product/adminProductSlice';
import {useDispatch, useSelector} from 'react-redux';



export default function BrandSelect({handleInputChange,brand}) {

 
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Brand</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={brand}
          label="Select Brand"
          name='brand'
        >
           <MenuItem key={'011'} value={brand}>{brand}</MenuItem>
        </Select>
       
      </FormControl>
     
    </Box>
  );
}
