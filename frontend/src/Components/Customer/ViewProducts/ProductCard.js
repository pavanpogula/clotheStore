import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';


import Typography from '@mui/material/Typography';
import CustomizedTables from './CustomizedTables';


export default function ProductCard({productData}) {

    const {
        productId,
        price,
        brand,
        color,
        title,
        imageData,
        description,
        sizesArray
      } = productData


      
  
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
          <br/>
          <CustomizedTables sizesArray={sizesArray} productId={productId}/>
      </CardContent>
      <CardActions disableSpacing>
        
      </CardActions>
    </Card>
  );
}