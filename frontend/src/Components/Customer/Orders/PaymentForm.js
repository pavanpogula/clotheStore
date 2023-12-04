import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid, Stack } from '@mui/material';
import styled from 'styled-components';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useDispatch } from 'react-redux';
import { updatePayment } from '../../../features/product/customerProductSlice';



const ButtonContainer = styled.div`
margin-top: 10px;
margin-bottom: 10px;
display: flex;
width: 100%;
justify-content: center;
`;
const Container = styled.div`
display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
`;
 
const MainContainer = styled.div`
boxShadow: 0 4px 8px 0 rgba(0,0,0,0.2);
borderRadius:5px;
padding:10px;
transition:0.3s;
`;

const CustomerPaymentForm = ({setisPaymentDetailsEmpty,setpaymentType,setpaymentcardNumber}) => {
  const [cardType, setCardType] = React.useState('debit');
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiration, setExpiration] = React.useState('');
  const [cvv, setCVV] = React.useState('');
  const [pincode, setPincode] = React.useState('');

  const dispatch = useDispatch();
  const handleCardTypeChange = (event) => {
    setCardType(event.target.value);
    setpaymentType(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
    setpaymentcardNumber(event.target.value);
  };

  const handleExpirationChange = (value) => {
    setExpiration(value);
  };

  const handleCVVChange = (event) => {
    setCVV(event.target.value);
  };

  const handlePincodeChange = (event) => {
    if((event.target.value).length < 6){
      setPincode(event.target.value);
    }
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let validate =false;
    if(cardNumber ==''){
        validate = true
    }
    if(expiration ==''){
        validate = true
    }
    if(cvv ==''){
        validate = true
    }
    if(pincode ==''){
        validate = true
    }
    setisPaymentDetailsEmpty(validate)
    if(!validate){
      dispatch(updatePayment({ 
        cardType:cardType,
      cardNumber:cardNumber,}))
    }

  };

  return (
    <MainContainer>    
        <h3>

            Payment Details
        </h3>
        <Container>
      <FormControl size="small">
        <InputLabel>Card Type</InputLabel>
        <Select value={cardType} onChange={handleCardTypeChange}>
          <MenuItem value="credit">Credit</MenuItem>
          <MenuItem value="debit">Debit</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small">
        <TextField
          label="Card Number"
          value={cardNumber}
          onChange={handleCardNumberChange}
          inputProps={{
            maxLength: 16,
          }}
          InputProps={{
            startAdornment: <CreditCardIcon />,
          }}
        />
      </FormControl>
      <Stack direction="row" spacing={2}>
        <FormControl>
          <TextField
            label="Expiration Date"
            value={expiration}
            onChange={(e) => handleExpirationChange(e.target.value)}
            placeholder="MM/YYYY"
            inputProps={{
              maxLength: 7,
            }}
          />
        </FormControl>
        <FormControl sx={{ width: '80px' }}>
          <TextField
          type='password'
            label="CVV"
            value={cvv}
            onChange={handleCVVChange}
            inputProps={{
              maxLength: 3,
            }}
          />
        </FormControl>
      </Stack>
      <FormControl sx={{ width: '120px' }}>
        <TextField
          label="Pincode"
          value={pincode}
          onChange={handlePincodeChange}
        />
      </FormControl>
      <ButtonContainer>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Done
      </Button>
      </ButtonContainer>
    </Container>
    </MainContainer>

  );
};

export default CustomerPaymentForm;
