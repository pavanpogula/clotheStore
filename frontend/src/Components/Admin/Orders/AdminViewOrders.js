import React, { useEffect } from 'react'

import styled from "styled-components"
import CustomizedTables from './AdminOrderTable';



function AdminOrders() {
 
    
    
    return (
        <MainNav>
            <LeftContainer>
                <Card>
                <Title >
            ORDERS
        </Title>
        <CustomizedTables/>
                </Card>
            </LeftContainer>
            

        </MainNav>
    )
}

const MainNav = styled.div`
margin-left: 240px;
position: absolute;
display:flex;
padding-bottom:20px;
`
const LeftContainer = styled.div`

height:500px;
margin-right:10px;
margin-left:10px;
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

export default AdminOrders