import React from 'react'
import { MainNav } from '../../Admin/styles/styles'
import HeaderTextComponent from '../../Login/HeaderTextComponent'
import styled from "styled-components"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import FormComponent from './FormComponent';
 import CustomerPaymentForm from './PaymentForm';
import Total from './Total';
import Button from '@mui/material/Button';
import { useSelector,useDispatch } from 'react-redux';
import { insertOrder, updateProductArray } from '../../../features/product/customerProductSlice';
import { Cookies } from 'react-cookie';

function CustomerOrderSummary() {
    const cookies = new Cookies();

    const theme = createTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //delivery details
    const [deliveryType, setdeliveryType] = React.useState("pickup");
    const [deliveryAddress, setdeliveryAddress] = React.useState("6490ed82b7e7f881401855d0");

    //payment details
    const [isPaymentDetailsEmpty, setisPaymentDetailsEmpty] = React.useState(true);
    const [paymentType, setpaymentType] = React.useState("Debit");
    const [paymentcardNumber, setpaymentcardNumber] = React.useState("");

    //orders
    const [paymenttotal, setpaymenttotal] = React.useState("");
    const [orderProducts, setorderProducts] = React.useState(null);


    const productsData = useSelector(state => state.adminProducts['productsWithImages'])
    const sizesData = useSelector(state => state.customerAddedProducts['selectedProducts']);
    
    const filteredProducts = Object.keys(sizesData).map(productId => {
        const productData = Object.values(productsData).filter((obj) => obj._id === productId)
        const selected = sizesData[productId].filter(size => size.selected > 0);
    const qty = selected.reduce((total, size) => total + parseInt(size.selected), 0);
    const sizes = selected.map(size => size.size);
        return ({
           
            id:productData[0]._id,
            qty,
            sizes,
            price: productData[0].price,
        })
    });
    const {selectedPayment,selectedAddress,selectedProducts} = useSelector(state => state.customerAddedProducts);
    const placeOrder = () =>{

        dispatch(updateProductArray(filteredProducts));
       
        
        dispatch(insertOrder( {selectedPayment,selectedAddress,'selectedProductArray':selectedProducts,'deliveryType':deliveryType,'customerId':cookies.get("id"),'total':paymenttotal}))
     navigate('/customerViewOrders')
    }
  return (
   <>
   <MainNav>
    <HeaderTextComponent title={'Order Summary'}/>
    <div style={{display:'flex',marginLeft:'200px',width:'auto'}}>
    <LeftContainer>
                <AddressBox>
                    <ThemeProvider theme={theme}>
                        <FormComponent
                            setdeliveryType={setdeliveryType}
                            setdeliveryAddress={setdeliveryAddress}
                        />
                    </ThemeProvider>
                </AddressBox>
                <PaymentBox>
                    <CustomerPaymentForm
                        setisPaymentDetailsEmpty={setisPaymentDetailsEmpty}
                        setpaymentType={setpaymentType}
                        setpaymentcardNumber={setpaymentcardNumber}
                    />
                </PaymentBox>
            </LeftContainer>
            <RightContainer>
                <Total
                    setpaymenttotal={setpaymenttotal}
                    setorderProducts={setorderProducts}
                />
                <ButtonContainer>
                    <Button variant="contained" size="medium" onClick={() => placeOrder()} >
                        Place Order
                    </Button>
                </ButtonContainer>
            </RightContainer>
            </div>
   </MainNav>
   </>
  )
}


const LeftContainer = styled.div`
width:600px;
height:500px;
margin-right:10px;
margin-left:10px;
`;

const AddressBox = styled.div`
width:auto;
height:auto;
margin:10px;
padding:10px;
`;

const ButtonContainer = styled.div`
margin-top: 10px;
margin-bottom: 10px;
display: flex;
width: 100%;
justify-content: center;
`;
const PaymentBox = styled.div`
width:auto;
height:200px;
margin:10px;
`;
const RightContainer = styled.div`
width:300px;
height:500px;
margin-left:10px;
margin-right:10px;
`;



export default CustomerOrderSummary