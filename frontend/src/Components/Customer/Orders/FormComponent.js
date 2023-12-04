import React, { useState , useEffect} from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { updateAddress, updateDeliveryType } from '../../../features/product/customerProductSlice';
import { useDispatch } from 'react-redux';

const FormContainer = styled('div')(({ theme }) => ({
  maxWidth: 500,
  padding: theme.spacing(3),
  backgroundColor: '#f5f5f5',
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  textAlign: 'center',
}));

const InputField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const PickupContainer = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.secondary.main}`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  marginTop: theme.spacing(2),
}));

const PickupText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 'bold',
}));

const FormComponent = ({setdeliveryType,setdeliveryAddress}) => {


  const [shippingMethod, setShippingMethod] = useState('');
 
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const[timeShipping,setTimeShipping]=useState("10");
  const dispatch = useDispatch();

  const handleTimeShippingMethodChange = (event) =>{
    setTimeShipping(event.target.value)
  }

  const handleShippingMethodChange = (event) => {

    setShippingMethod(event.target.value);
    setdeliveryType(event.target.value);
    if(event.target.value=="pickup"){
     setAddress('Clothe Store 1804 criag Street')
     setState('Kansas')
     setCity('Overland park')
     setPincode('66223')
     
    }else{
      setAddress('')
      setState('')
      setCity('')
      setPincode('')
    }
  };

  const handleDoneClick = () => {
    if (validateForm()) {
        dispatch(updateAddress({
          street:address,
          pin:pincode,
          city:city,
          country:'USA',
          state:state
        }))
        dispatch(updateDeliveryType(shippingMethod))
    
    } else {
      alert('Please fill in all the required fields.');
    }
  };

 

  const validateForm = () => {
    const errors = {};
    if (shippingMethod === 'delivery') {
      if (address.trim() === '') {
        errors.address = true;
      }
      if (city.trim() === '') {
        errors.city = true;
      }
      if (state.trim() === '') {
        errors.state = true;
      }
      if (pincode.trim() === '') {
        errors.pincode = true;
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <FormContainer>
      <Title variant="h6">Shipping Details</Title>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="shipping-method-label">Shipping Method</InputLabel>
            <Select
              labelId="shipping-method-label"
              id="shipping-method"
              value={shippingMethod}
              onChange={handleShippingMethodChange}
            >
              <MenuItem value="delivery">Delivery</MenuItem>
              <MenuItem value="pickup">Store Pickup</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {shippingMethod === 'delivery'   ? (
          <>
            <Grid item xs={12}>
              <InputField
                id="address"
                label="Address"
                fullWidth
                maxLength={30}
                variant="outlined"
                error={validationErrors.address}
                value={address}
                onChange={(e) => { setAddress(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                id="city"
                label="City"
                fullWidth
                variant="outlined"
                error={validationErrors.city}
                value={city}
                onChange={(e) =>{ setCity(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                id="state"
                label="State"
                fullWidth
                variant="outlined"
                error={validationErrors.state}
                value={state}
                onChange={(e) => {setState(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                id="pincode"
                label="Pincode"
                fullWidth
                variant="outlined"
                error={validationErrors.pincode}
                value={pincode}
                onChange={(e) => {setPincode(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                id="country"
                label="Country"
                fullWidth
                variant="outlined"
                disabled
                value="USA"
              />
            </Grid>
            <Grid item xs={12}>
            <Box textAlign="center">
                  <Button variant="contained" color="primary" onClick={handleDoneClick}>
                    Done
                  </Button>
                </Box>
            </Grid>
          </>
        ) : (
          <>
          <Grid item xs={12}>
            <PickupContainer>
              <PickupText>Pickup Location: "Clothe Store 1804 criag Street, Overland park, Kansas City, 66223"</PickupText>
              <PickupText>Pickup Time: "10:00 AM" To "6:00PM"</PickupText>
            </PickupContainer>
          </Grid>
          <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="shipping-method-label">Shipping Method</InputLabel>
            <Select
              labelId="shipping-method-label"
              id="shipping-method"
              value={timeShipping}
              onChange={handleTimeShippingMethodChange}
            >
             { [10,11,12,11,1,2,3,4,5,6].map((obj,index) => (
              <MenuItem key={index+"-"+obj} value={obj}>{obj}:00{index>=2?"PM":"AM"}</MenuItem>
             ))

              }
              
              
            </Select>
          </FormControl>
          
        </Grid>
        <Grid item xs={12}>
            <Box textAlign="center">
                  <Button variant="contained" color="primary" onClick={handleDoneClick}>
                    Done
                  </Button>
                </Box>
            </Grid>
          </>
        )}
      </Grid>
    </FormContainer>
  );
};

export default FormComponent;
