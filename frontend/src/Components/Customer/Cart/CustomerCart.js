import React from 'react'
import { MainNav } from '../../Admin/styles/styles'
import HeaderTextComponent from '../../Login/HeaderTextComponent'
import { useSelector } from 'react-redux'

import ProductCard from '../ViewProducts/ProductCard'
import { useNavigate } from 'react-router-dom'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function CustomerCart() {
    const navigate = useNavigate();
    const productsData = useSelector(state => state.adminProducts['productsWithImages'])
    const sizesData = useSelector(state => state.customerAddedProducts['selectedProducts']);

    const filteredProducts = Object.keys(sizesData).map(productId => {
        const productData = Object.values(productsData).filter((obj) => obj._id === productId)

        return ({
            productDetails: productData[0],
            selectedSizes: sizesData[productId]
        })
    });


    const goToCeckout = () => {
        navigate('/checkout');
    }
    const goToDashboard = () => {
        navigate('/viewProductsCustomer');
    }
    console.log(" cart data : ", filteredProducts)

    return (

        <MainNav>
            <HeaderTextComponent title={'Cart'} />
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '1300px', justifyContent: 'space-between' }}>
                <div  style={{ display: 'flex', flexWrap: 'wrap', width: '1300px', justifyContent: 'space-between' }}><Fab onClick={() => goToDashboard()} color="primary" aria-label="add" variant="extended" >
                    <AddIcon sx={{ mr: 1 }} />
                    DashBoard
                </Fab>
               { 
               filteredProducts.length>0 &&<Fab onClick={() => goToCeckout()} color="primary" aria-label="add" variant="extended" >
                    <AddIcon sx={{ mr: 1 }} />
                    Checkout
                </Fab>
}
                </div>
                {
                    filteredProducts.length>0 ? filteredProducts.map((obj, index) => (
                        <ProductCard
                            productData={{
                                'productId': obj['productDetails']._id,
                                'price': obj['productDetails'].price,
                                'brand': obj['productDetails'].brand,
                                'color': obj['productDetails'].color,
                                'title': obj['productDetails'].title,
                                'description': obj['productDetails'].description,
                                'imageData': obj['productDetails'].image,
                                'sizesArray': obj['selectedSizes']
                            }}
                        />
                    ))
                    :
                    <div style={{margin:'auto'}}>
                        <h1 >
                            Cart is Empty
                        </h1>
                    </div>
                }
            </div>
        </MainNav>
    )
}

export default CustomerCart