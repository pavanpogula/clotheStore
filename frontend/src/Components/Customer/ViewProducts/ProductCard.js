import * as React from 'react';
import { styled } from '@mui/material/styles';
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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard({productData}) {
  const navigate = useNavigate();
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