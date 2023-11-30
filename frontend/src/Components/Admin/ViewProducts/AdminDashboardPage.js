import React, { useEffect } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import { getAllProductsWithImages } from '../../../features/product/adminProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MainNav = styled.div`
margin-left: 240px;
position: absolute;
`;
const Item = styled.div`
width: 33%;
margin-bottom:20px;
&:nth-child(odd) {
  order: 1;
}
`;
const Card = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width: 250px;
border-radius: 5px;
margin-left: 10px;
`;
const TextContainer = styled.div`
display: flex;
    flex-direction: column;
padding: 2px 16px;
`;
const Title = styled.h3``;

const Quantity = styled.span`
width: 24px;
text-align: center;
`


const ButtonContainer = styled.div`
margin-top: 10px;
margin-bottom: 10px;
display: flex;
width: 100%;
justify-content: center;
`;


const SubCardContainer = styled.div`
padding:5px;
border:5px solid black;
border-radius:5px;
`

const ImageContainer = styled.img`
width:100%;
height:250px;
border-radius: 5px 5px 0 0;
`;



function ViewProductsPageAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsData = useSelector(state => state.adminProducts['productsWithImages'])

  useEffect(() => {
    dispatch(getAllProductsWithImages());
  }, [])


  const editHandler = (
   { price,
    title,
    description,
    color,
    productId,
    brand}
  ) => {
    navigate(
      '/adminEditProduct',
      {
        state: {
          price,
          brand,
          title,
          description,
          color,
          productId,

        }
      });
  }

  return (

    <MainNav>
      <h1>
        Dashboard
      </h1>

      <>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>

          {
            productsData &&
            Object.values(productsData).map((obj, index) => {
              const sizesArray = Object.entries(obj.sizes).map(([size, quantity]) => ({ size, quantity }));
              return (
                <Item key={index} >

                  <Card>
                    <SubCardContainer>
                      <ImageContainer src={obj.image} alt='productImage' />
                    </SubCardContainer>
                    <TextContainer>
                      <Title><b>{obj.title}</b></Title>
                      <span>Description :  <b>{obj.description}</b></span>
                      <span>Company :  <b>{obj.brand}</b></span>
                      <span>Price : <b>{obj.price} $</b></span>
                      <span><b>Quantity </b></span>
                      {
                        sizesArray.map((items, indexSize) => <><span><b>{items.size}</b>  : {items.quantity}</span></>)
                      }

                      <ButtonContainer >

                        <Button variant="contained" size="medium" onClick={() => editHandler({
                          'productId': obj._id,
                          'price': obj.price,
                          'brand': obj.brand,
                          'color': obj.color,
                          'title': obj.title,
                          'description': obj.description
                        })}>
                          Edit
                        </Button>

                      </ButtonContainer>

                    </TextContainer>

                  </Card>
                </Item>)
            })
          }




        </div>
      </>

    </MainNav>
  )
}

export default ViewProductsPageAdmin