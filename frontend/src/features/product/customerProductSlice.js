import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios  from 'axios'

const initialState = {
    loading:false,
    selectedProducts:{},
    selectedAddress:{
        street:'',
        pin:'',
        city:'',
        country:'',
        state:''
    },
    selectedPayment:{
        cardType:'',
        cardNumber:'',
    },
    deliveryType:'',
    selectedProductArray:[],
    insertProductData:'',
    error:''
}

const insertOrder = createAsyncThunk(
    'customerData/insertOrder',
    async ({ selectedPayment,selectedAddress,selectedProductArray,deliveryType,customerId,total }) => {
        console.log({ selectedPayment,selectedAddress,selectedProductArray,deliveryType,customerId,total })
      
       const response = await axios.post(
            'http://localhost:8000/placeOrder',
            {selectedPayment,selectedAddress,selectedProductArray,deliveryType,customerId,total }
            ,{
                headers: {
                  'Content-Type': 'application/json',
                }
              })
        return response.data;
    }
)






const customerSelectedItemsSlice = createSlice({
    name:'selectedProducts',
    initialState,
    reducers:{
        updateProduct:(state,action) => { 
            state.selectedProducts = { 
                ...action.payload
            }
        },
        updateAddress:(state,action) => {
            state.selectedAddress={
                ...action.payload
            }
        },
        updatePayment: (state,action) =>{
            state.selectedPayment = {
                ...action.payload
            }
        },
        updateProductArray: (state,action) => {
            state.selectedProductArray=[
                ...action.payload
            ]
        },
        updateDeliveryType: (state,action) =>{
            state.deliveryType=action.payload
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(insertOrder.pending, (state) => {
            state.loading=true
            state.insertProductData=''
            state.error=''
        })
        builder.addCase(insertOrder.fulfilled, (state,action)=>{
            state.loading=false
            state.insertProductData=action.payload
            state.error=''
        })
        builder.addCase(insertOrder.rejected, (state,action)=>{
            state.loading=false
            state.insertProductData=''
            state.error=action.error.message
        })
    }
})


export default customerSelectedItemsSlice.reducer
export const {updateDeliveryType,updateProductArray,updateProduct,updatePayment, updateAddress } = customerSelectedItemsSlice.actions;
export  {insertOrder};