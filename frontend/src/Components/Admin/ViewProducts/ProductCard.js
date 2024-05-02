import * as React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CustomizedTables from './CustomizedTables';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';



export default function ProductCard({productData}) {
  const cookies = new Cookies();
  const role = cookies.get("role")
  const navigate = useNavigate();
    const {
        productId,
        price,
        brand,
        color,
        title,
        imageData,
        description,
        sizesArray,
        sales
      } = productData


      const editHandler = () => {
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
    <Card sx={{ width: 345, margin:'10px' ,border:'black 2px solid'}}>
      <CardHeader
        title={title}
        subheader={'Brand : '+brand}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageData}
        alt="Paella dish"
        sx={{objectFit:'contain'}}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         Price : <b>{price} $</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
           Color : <b>{color}</b>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description :  <b>{description}</b>
          </Typography>
         {role=='admin'?<Typography variant="body2" color="text.secondary">
            Number of Sales :  <b>{sales}</b>
          </Typography>:<></>} 
          <br/>
          <CustomizedTables sizesArray={sizesArray}/>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={()=>editHandler()} style={{margin:'auto',color:'black',borderRadius:'10px',border:'5px black solid'}} aria-label="share">
         <EditIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
}