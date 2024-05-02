import axios  from 'axios'

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    loading:false,
    user:{},
    error:''
}
// fulfilled, pending ,rejected
const customerLogin = createAsyncThunk(
    'user/loginCustomer',
    async ({ email, password } ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8080/loginCustomer',
            { mail:email, password },
            config)
        return response.data

    }
    
)

const customerFetch = createAsyncThunk(
    'user/customerFetch',
    async ({ id} ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8080/getCustomerDetailsById',
            { id },
            config)
        return response.data

    }
    
)

const adminFetch = createAsyncThunk(
    'user/adminFetch',
    async ({ id} ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8080/getAdminDetailsById',
            { id },
            config)
        return response.data

    }
    
)

const adminLogin = createAsyncThunk(
    'user/loginAdmin',
    async ({ email, password } ) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.post(
            'http://localhost:8080/loginAdmin',
            { mail:email, password },
            config)
        return response.data

    }
    
)



const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        resetCustomer(state){
            state.user={}
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(customerLogin.pending, (state) => {
            state.loading=true
            state.user={}
            state.error=''
        })
        builder.addCase(customerLogin.fulfilled, (state,action)=>{
            state.loading=false
            state.user=action.payload
            state.error=''
        })
        builder.addCase(customerLogin.rejected, (state,action)=>{
            state.loading=false
            state.user={}
            state.error=action.error.message
        })
        builder.addCase(customerFetch.pending, (state) => {
            state.loading=true
            state.user={}
            state.error=''
        })
        builder.addCase(customerFetch.fulfilled, (state,action)=>{
            state.loading=false
            state.user=action.payload
            state.error=''
        })
        builder.addCase(customerFetch.rejected, (state,action)=>{
            state.loading=false
            state.user={}
            state.error=action.error.message
        })
        builder.addCase(adminLogin.pending, (state) => {
            state.loading=true
            state.user={}
            state.error=''
        })
        builder.addCase(adminLogin.fulfilled, (state,action)=>{
            state.loading=false
            state.user=action.payload
            state.error=''
        })
        builder.addCase(adminLogin.rejected, (state,action)=>{
            state.loading=false
            state.user={}
            state.error=action.error.message
        })
        builder.addCase(adminFetch.pending, (state) => {
            state.loading=true
            state.user={}
            state.error=''
        })
        builder.addCase(adminFetch.fulfilled, (state,action)=>{
            state.loading=false
            state.user=action.payload
            state.error=''
        })
        builder.addCase(adminFetch.rejected, (state,action)=>{
            state.loading=false
            state.user={}
            state.error=action.error.message
        })
    }
})

export default userSlice.reducer
export {customerFetch,customerLogin,adminLogin,adminFetch}
export const {resetCustomer} = userSlice.actions


