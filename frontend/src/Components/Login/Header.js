import React from 'react';
import { styled } from '@mui/system';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Home, ExitToApp, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';
import ReorderIcon from '@mui/icons-material/Reorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux';
import { resetCustomer } from '../../features/user/userSlice';
const AppBarStyled = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor:'black',
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));


const Header = () => {
    const navigate = useNavigate();
    const cookiesv = new Cookies();
    const dispatch = useDispatch()
  const role = cookiesv.get("role")
  const handleCartClick = () => {
    navigate('/cart');
  };
 const handleLogout = async () =>{

  cookiesv.remove("id");

  cookiesv.remove("role");
  dispatch(resetCustomer())
    navigate("/login")

 }


 const handleHome = () =>{
   
    navigate(cookiesv.get("role") === "customer"?"/customerDashboard":"/adminDashboard");
 }
 const handleOrder = () => {
  navigate(cookiesv.get("role") === "customer"?"/customerViewOrders":"/adminViewOrders");
 }
 
  return (
    <AppBarStyled position="static">
      <Toolbar>
        <Title variant="h6">
          {`Clothe E-Store -  ${ cookiesv.get("role") && cookiesv.get("role") === "customer"?" [ Hello Customer ]":cookiesv.get("role") === "admin"?"[ Hello Admin ]":""} `}
        </Title>
        
         {
          role === "customer" || role === "admin" ?
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
          role === "customer" || role === "admin" ?
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
