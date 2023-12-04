import axios  from 'axios'

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    loading:false,
    user:{},
    error:''
}
// fulfilled, pending ,rejected
const customerRegster = createAsyncThunk(
    'customer/registerCustomer',
    async ({  mail, password,phone,street,city,country,pin,state,firstname, lastname } ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/addCustomer',
            {  mail, password,phone,street,city,country,pin,state,firstname, lastname },
            config)
        return response.data

    }
    
)




const customerSlice = createSlice({
    name:'customer',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(customerRegster.pending, (state) => {
            state.loading=true
            state.user={}
            state.error=''
        })
        builder.addCase(customerRegster.fulfilled, (state,action)=>{
            state.loading=false
            state.user=action.payload
            state.error=''
        })
        builder.addCase(customerRegster.rejected, (state,action)=>{
            state.loading=false
            state.user={}
            state.error=action.error.message
        })
       
    }
})

export default customerSlice.reducer
export {customerRegster}


