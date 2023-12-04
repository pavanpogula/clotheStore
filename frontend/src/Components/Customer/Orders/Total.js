import React, { useEffcet, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from "styled-components"


function Total({ setpaymenttotal, setorderProducts }) {

    const [totalPriceValue, setTotalPrice] = useState(0);
    const productsData = useSelector(state => state.adminProducts['productsWithImages'])
    const sizesData = useSelector(state => state.customerAddedProducts['selectedProducts']);

    const filteredProducts = Object.keys(sizesData).map(productId => {
        const productData = Object.values(productsData).filter((obj) => obj._id === productId)
        
        return ({
            price: productData[0].price,
            selectedSizes: sizesData[productId]
        })
    });

    const calculateTotalPrice = (items) => {
        let totalPrice = 0;
        items.forEach((item) => {
            item.selectedSizes.forEach((size) => {
                totalPrice += item.price * size.selected;
            });
        });
        return totalPrice;
    };
    useEffect(() => {
        const totalValue = calculateTotalPrice(filteredProducts);
        setTotalPrice(totalValue)
        setTotalCost(multiplyFun(totalValue, 0.085))
        setpaymenttotal(multiplyFun(totalValue, 0.085))
    }, [])

    const multiplyFun = (a, b) => {
        const total = parseFloat(((a * b).toFixed(2)));
        return total + a;
    };
    const [totalCost, setTotalCost] = React.useState(0);
    return (
        <Card>
            <Title >
                TOTAL
            </Title>
            <ItemContainer>
                <Items> <span><b>Price :  </b></span> <span> {totalPriceValue} $</span></Items>
                <Items> <span><b>Tax </b></span> <span> .85%</span></Items>
                <Items><span><b>Overal Total :  </b></span> <span> {totalCost} $ </span></Items>
            </ItemContainer>
        </Card>
    )
}

const Items = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 220px;
`;

const ItemContainer = styled.div`
margin-left:10px;
`
const Title = styled.h3`
text-align:center;
`;

const Card = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width: 250px;
border-radius: 5px;
padding:10px;
`;


export default Total