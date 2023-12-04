import React from 'react';
import { styled } from '@mui/system';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Home, ExitToApp, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import ReorderIcon from '@mui/icons-material/Reorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const AppBarStyled = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor:'black',
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));


const Header = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
  const role = cookies.get("role")
  const handleCartClick = () => {
    navigate('/cart');
  };
 const handleLogout = async () =>{
    await cookies.remove("id");
   await cookies.remove("role");
    navigate("/")

 }


 const handleHome = () =>{
   
    navigate(cookies.get("role") == "customer"?"/customerDashboard":"/adminDashboard");
 }
 const handleOrder = () => {
  navigate(cookies.get("role") == "customer"?"/customerViewOrders":"/adminViewOrders");
 }
 
  return (
    <AppBarStyled position="static">
      <Toolbar>
        <Title variant="h6">
          {`Clothe E-Store -  ${ cookies.get("role") && cookies.get("role") == "customer"?" [ Hello Customer ]":cookies.get("role") == "admin"?"[ Hello Admin ]":""} `}
        </Title>
        
         {
          role == "customer" || role == "admin" ?
          <>
          <IconButton color="inherit" onClick={()=>handleHome()}>
          <Home />
        </IconButton>
        <IconButton color="inherit" onClick={()=>handleOrder()}>
          <ReorderIcon />
        </IconButton>
        {
          role == "customer"?<>
          <IconButton color="inherit" onClick={()=>handleCartClick()}>
          <ShoppingCartIcon />
        </IconButton>
          </>:<></>
        }
        </>
        :<></>
        }
        {
          role == "customer" || role == "admin" ?
          <IconButton color="inherit"  onClick={()=>handleLogout()} >
          <ExitToApp />
        </IconButton>
        :<></>
        }
        
      </Toolbar>
    </AppBarStyled>
  );
};

export default Header;
