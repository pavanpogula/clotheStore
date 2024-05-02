import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styled from "styled-components"
import SingleOrderTable from './SingleOrderTable';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from 'axios';



function ShowOrderPageAdmin() {
    const { state } = useLocation();
    const navigate = useNavigate()
    console.log("state data ", state)
    const goBack = () => {
        navigate('/adminViewOrders')
    }

 


    const deliverOrder = async () => {
        if(age==='Delivered')
        {const response = await axios.post(`http://localhost:8080/updateOrder`, { orderId:state.id })
            .then(e => e.data);
        if (response == "success") {
            navigate("/adminViewOrders")
        }}

    }
    const [age, setAge] = React.useState('InProgress');
   
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    
    return (
        <MainNav>
            <LeftContainer>
                <Card>
                    <Title >
                        Order Details
                    </Title>
                    <SingleOrderTable orderDetails={state} />
                    <ButtonContainer>
                        <Button variant="contained" size="medium" onClick={() => goBack()} >
                            OK
                        </Button>
                    </ButtonContainer>
                </Card>
            </LeftContainer>
            <RightContainer>

                {!(state.deliveryStatus == "delivered" ) ?
                    <>
                        <Card>
                            <Title >
                                Deliver Options
                            </Title>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Delivery</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem key={'331'} value={"Delivered"}>{"Delivered"}</MenuItem>
                                        <MenuItem key={'331qq'} value={"InProgress"}>{"InProgress"}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <ButtonContainer>
                                <Button variant="contained" size="medium" onClick={() => deliverOrder()} >
                                    Deliver Order
                                </Button>
                            </ButtonContainer>
                        </Card>

                    </> :<></>
}
            </RightContainer>

        </MainNav>
    )
}

const LeftContainer = styled.div`

height:500px;
margin-right:10px;
margin-left:10px;
`;

const RightContainer = styled.div`
width:300px;
height:500px;
margin-left:10px;
margin-right:10px;
`;

const ButtonContainer = styled.div`
margin-top: 10px;
margin-bottom: 10px;
display: flex;
width: 100%;
justify-content: center;
`;
const Title = styled.h3`
text-align:center;
`;

const Card = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;

border-radius: 5px;
padding:10px;
`;
const MainNav = styled.div`
margin-left: 240px;
position: absolute;
display:flex;
padding-bottom:20px;
`
export default ShowOrderPageAdmin