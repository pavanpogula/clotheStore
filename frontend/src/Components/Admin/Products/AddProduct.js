import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom';
import MultipleSelectSizes from './MultipleSelectSizes';
import BrandSelect from './BrandSelect';
import { useDispatch } from 'react-redux';
import { insertProducts } from '../../../features/product/adminProductSlice';



const AddProduct = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ age,setAge] = React.useState("");
    const validateNumberString = (input)=> {
        const numberRegex = /^-?\d+(\.\d+)?$/;
        return numberRegex.test(input);
      }
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [price, setPrice] = useState('');
  const [company, setCompany] = useState('none');
  const [quantity, setQuantity] = useState('');
  const [brand, setBrand] = useState('');
  const [sizes, setSizes ] = useState([]);
  const [image, setImage] = useState(null);
  const [color, setColor] = useState('');
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
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    
    setImage(file);
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
    if (!image) errors.image = true;
    if (!color) errors.color = true;
    if (!sizes) errors.sizes = true;
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      alert('Fields should not be empty');
      return;
    }else{
     
      dispatch(insertProducts({title, description, price,color, company, quantity, image, sizes, brand}));
      navigate("/adminDashboard")
    }

    

   
  };
 

  return (
    <Container>
        <h3>
            Add Product
        </h3>
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
      { brand == "new" &&<TextField
        label="New Brand"
        name="company"
        value={company}
        onChange={handleInputChange}
        error={errors.company}
        helperText={errors.company ? 'Company is required' : ''}
      />
  }
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
      
      
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        error={errors.image}
        style={{ display: 'none' }}
        id="upload-image"
      />
      <label htmlFor="upload-image">
        <Button component="span" variant="outlined" color="primary">
        Upload Image
        </Button>
        {errors.image && <span style={{ color: 'red' }}>Image is required</span>}
      </label>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
`;

export default AddProduct;
