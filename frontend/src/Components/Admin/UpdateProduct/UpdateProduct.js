import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import styled from 'styled-components'

import { useLocation, useNavigate } from 'react-router-dom';
import MultipleSelectSizes from './MultipleSelectSizes';
import BrandSelect from './BrandSelect';
import { useDispatch } from 'react-redux';
import { insertProducts, updateProductAdmin } from '../../../features/product/adminProductSlice';
import HeaderTextComponent from '../../Login/HeaderTextComponent';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
`;

const UpdateProduct = () => {

  const {state} = useLocation();





  const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const validateNumberString = (input)=> {
        const numberRegex = /^-?\d+(\.\d+)?$/;
        return numberRegex.test(input);
      }
      const [productId,setProductId] = useState(state.productId)
  const [title, setTitle] = useState(state.title);
  const [description, setdescription] = useState(state.description);
  const [price, setPrice] = useState(state.price);
  const [company, setCompany] = useState('none');
  const [quantity, setQuantity] = useState('');
  //brand cannot be changed
  const [brand, setBrand] = useState(state.brand);
  //image cannot be changed
  const [sizes, setSizes ] = useState([]);
  const [color, setColor] = useState(state.color);
  const [errors, setErrors] = useState({});
    const[fileName,setFileName] = useState('upload-image');

  const handleInputChange = (event) => {

    const { name, value } = event.target;
    if (name === 'title') setTitle(value);
    else if (name === 'description') setdescription(value);
    else if(name === 'brand') {
      
      setBrand(value);
    }
    else if (name === 'price') {
        if(validateNumberString(value))
            setPrice(value)
    }
    else if (name === 'company') {setCompany(value);}
    else if (name === 'color') {setColor(value);}
    else if (name === 'quantity'){setQuantity(value<=0?quantity:value)};
    
  };
  
 
  const handleSetSizes = (value) =>{
    setSizes(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!title.trim()) errors.title = true;
    if (!description.trim()) errors.description = true;
    if (!price.trim()) errors.price = true;
    if (!company.trim()) errors.company = true;
    if (!quantity.trim()) errors.quantity = true;
    if (!color) errors.color = true;
    if (!sizes) errors.sizes = true;
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      alert('Fields should not be empty');
      return;
    }else{
      dispatch(updateProductAdmin({productId,title, description, price,color, quantity, sizes}))
      navigate("/adminDashboard")
    }

    

   
  };
 

  return (
    <Container>
       <HeaderTextComponent title={'Update Product Details'} />
      <TextField
        label="Product Title"
        name="title"
        value={title}
        onChange={handleInputChange}
        error={errors.title}
        helperText={errors.title ? 'Title is required' : ''}
      />
      <TextField
        label="Product description"
        name="description"
        value={description}
        onChange={handleInputChange}
        error={errors.description}
        helperText={errors.description ? 'description is required' : ''}
      />
      <TextField
        label="Color"
        name="color"
        value={color}
        onChange={handleInputChange}
        error={errors.color}
        helperText={errors.color ? 'color is required' : ''}
      />
      <TextField
        label="Product Price"
        name="price"
        value={price}
        onChange={handleInputChange}
        error={errors.price}
        helperText={errors.price ? 'Price is required' : ''}
      />
    
      <BrandSelect handleInputChange={handleInputChange} brand={brand} />
      
   {errors.sizes && <span style={{color:'red'}}>Sizes can't be empty</span>}
      <MultipleSelectSizes handleSetSizes={handleSetSizes} />
      <TextField
        label="Product Quantity"
        name="quantity"
        type="number"
        value={quantity}
        onChange={handleInputChange}
        error={errors.quantity}
        helperText={errors.quantity ? 'Quantity is required' : ''}
      />
      
      
      
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default UpdateProduct;
