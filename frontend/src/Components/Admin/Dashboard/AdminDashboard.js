import React from 'react'

import { redirect, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import styled from 'styled-components'

const Title = styled.h3`
text-align: center;
`;

const Card = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width: 45%;
border-radius: 40px;
cursor: pointer;
margin: 10px;
`;

const SubCardContainer = styled.div`
padding:5px;
border:5px solid black;
border-radius:40px;
`

const MainNav = styled.div`
margin-left: 240px;
display: flex;
flex-wrap: wrap;
width:800px;
`
function AdminDashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAdminRoutes = (title,redirect) =>{
    switch (title) {
      case "Add Products":
        break;
      case "View Products":
        break;
      default:
        break;
    }
    navigate(redirect)
    
  }
  return (
    <div>
      <MainNav>
        {
          [ 
            {title:"Add Products",redirect:"/adminAddProduct"},
            {title:"View Products",redirect:"/viewProductsAdmin"},
           
           
            
          ].map((obj,index) => (
            <Card key={`card-${index}`}>
              <SubCardContainer  key={`SubCardContainer-${index}`} onClick={()=>handleAdminRoutes(obj.title,obj.redirect)}>
                <Title  key={`title-${index}`} >
                  {obj.title}
                </Title>
              </SubCardContainer>
            </Card>
          ))
        }


      </MainNav>
    </div>
  )
}

export default AdminDashboardPage