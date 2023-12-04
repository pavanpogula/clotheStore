import React, { useEffect } from 'react'

import { getAllProductsWithImages } from '../../../features/product/adminProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';

import HeaderTextComponent from '../../Login/HeaderTextComponent';
import { useNavigate } from 'react-router-dom';
import { MainNav } from '../../Admin/styles/styles';
import Fab from '@mui/material/Fab';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function ViewProductsPageCustomer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsData = useSelector(state => state.adminProducts['productsWithImages'])
  const goToCart = ()=>{
    navigate('/cart');
  }
  useEffect(() => {
    dispatch(getAllProductsWithImages());
  }, [])

  return (

    <MainNav>
      <HeaderTextComponent title={'Dasboard'}/>
      
      <Fab onClick={()=>goToCart()} color="primary" aria-label="add" variant="extended" >
        <ShoppingCartIcon  sx={{ mr: 1 }} />
        Cart
      </Fab>
      <>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '1300px', justifyContent: 'space-between' }}>

          {
            productsData &&
            Object.values(productsData).map((obj, index) => {
              const sizesArray = Object.entries(obj.sizes).map(([size, quantity]) => ({ size, quantity }));
              return (
                <ProductCard productData={{
                  'productId': obj._id,
                  'price': obj.price,
                  'brand': obj.brand,
                  'color': obj.color,
                  'title': obj.title,
                  'description': obj.description,
                  'imageData': obj.image,
                  'sizesArray': sizesArray
                }}
                />

              )
            })
          }
        </div>
      </>

    </MainNav>
  )
}

export default ViewProductsPageCustomer