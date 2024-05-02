import React, { useEffect, useState } from 'react';
import { TextField,Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { ButtonContainer, Title } from './styles';

import { useDispatch, useSelector,  } from 'react-redux';
import { customerRegster } from '../../../features/customer/customerSlice';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '400px',
    margin: '0 auto',
    marginBottom: '20px',
});
const SubmitButton = styled(Button)({
    marginTop: '16px',
    backgroundColor:'black',
    borderRadius:'20px',
  });
const Card = styled('div')({
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    width: '45%',
    padding:'10px',
    borderRadius: '40px',
    margin: 'auto',
    backgroundColor:'white',
})
const CustomerRegistration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [errors, setErrors] = useState({});
    const customerRegister = useSelector(state=>state.userRegister['user'])
    useEffect(()=>{
        console.log(" customerRegister : ",customerRegister)
        if(customerRegister["msg"] ==="409"){
            alert("User Already Exists")
        }
        else if(customerRegister["msg"] ==="201"){
            alert("User Registered Succesfully")
            navigate("/")
        }
        else if(customerRegister["msg"] ==="500"){
            alert("Try Again")
        }
    },[customerRegister])

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form fields
        const newErrors = {};
        if (!firstName) {
            newErrors.firstName = true;
        }
        if (!lastName) {
            newErrors.lastName = true;
        }
        if (!email) {
            newErrors.email = true;
        }
        if (!password) {
            newErrors.password = true;
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = true;
        }
        if(confirmPassword!==password){
            newErrors.confirmPassword = true;
            newErrors.password=true;
        }
        if (!mobileNumber) {
            newErrors.mobileNumber = true;
          }
          if (!address) {
            newErrors.address = true;
          }
          if (!city) {
            newErrors.city = true;
          }
          if (!state) {
            newErrors.state = true;
          }
          if (!pincode) {
            newErrors.pincode = true;
          }
         
       

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            if(confirmPassword!==password){
                alert('Passwords must match');
            }else{

            
            alert('Please fill in all fields');
            }
            return;
        }else{

         
                
                  
                    dispatch(customerRegster({"firstname":firstName, "lastname":lastName, "mail":email, "password":password, 
                    "phone":mobileNumber,
                    'street':address, 
                    'city':city, 
                    'country':"USA", 
                    'pin':pincode, 
                    'state':state }))
         
      
            
        }
        
      

       
        
    };

    return (
        <Container>
            <Card style={{ width: '500px', padding: '20px' }}>
                <Title>Customer Registeration</Title>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                error={errors.firstName}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                error={errors.lastName}
                                fullWidth
                            />
                        </Grid>
                       
                    </Grid>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        fullWidth
                        style={{ marginTop: '10px' }}
                    />
                    <TextField
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        type="password"
                        fullWidth
                        style={{ marginTop: '10px' }}
                    />
                    <TextField
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={errors.confirmPassword}
                        type="password"
                        fullWidth
                        style={{ marginTop: '10px' }}
                    />
    <TextField
          label="Mobile Number"
          value={mobileNumber}
          onChange={(e) => { setMobileNumber((e.target.value).length<=10?(e.target.value):mobileNumber)}}
          error={errors.mobileNumber}
          fullWidth
          style={{marginTop:'10px'}}
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={errors.address}
          fullWidth
          style={{marginTop:'10px'}}
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          error={errors.city}
          fullWidth
          style={{marginTop:'10px'}}
        />
        <TextField
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          error={errors.state}
          fullWidth
          style={{marginTop:'10px'}}
        />
        <TextField
          label="Zip Code"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          error={errors.pincode}
          fullWidth
          style={{marginTop:'10px'}}
        />
                    <ButtonContainer>
                        <SubmitButton onClick={()=>{navigate("/login")}} type="button" variant="contained" color="primary">
                            Back
                        </SubmitButton>

                        <SubmitButton  type="submit" variant="contained" color="primary" style={{marginLeft:'10px'}}>
                            Submit
                        </SubmitButton>
                    </ButtonContainer>

                </form>
            </Card>
        </Container>
    );
};

export default CustomerRegistration;
