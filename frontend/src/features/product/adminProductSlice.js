import axios  from 'axios'

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    loading:false,
    allBrands:[],
    productsWithImages:{},
    addProductData: '',
    error:''
}
// fulfilled, pending ,rejected
const getAllBrands = createAsyncThunk(
    'products/getAllBrands',
    async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.get(
            'http://localhost:8000/getAllBrands',
            config)
        return response.data.brands
    }
)


const getAllProductsWithImages = createAsyncThunk(
    'products/getAllProductsWithImages',
    async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
       const response = await axios.get(
            'http://localhost:8000/getAllProductsWithImages',
            config)
            console.log("data response  : ",response.data)
        return response.data
    }
)




const insertProducts = createAsyncThunk(
    'products/addProduct',
    async ({title, description,color, price, company, quantity, image, sizes, brand }) => {
        console.log({title, description, price, company, quantity, image, sizes, brand })
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
       const response = await axios.post(
            'http://localhost:8000/addProduct',
            {'title':title,'description': description,'color':color, 'price':price, 'company':company,'quantity': quantity, 'productImage':image, 'sizes': sizes, 'brand': brand }
            ,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
              })
        return response.data;
    }
)



const updateProductAdmin = createAsyncThunk(
    'products/updateProductAdmin',
    async ({ productId, sizes, quantity, price, color, title, description  }) => {
        console.log({ productId, sizes, quantity, price, color, title, description  })
        
       const response = await axios.post(
            'http://localhost:8000/updateProductAdmin',
            {'title':title,'description': description,'color':color, 'price':price, 'quantity': quantity, 'sizes': sizes, 'productId':productId }
            ,{
                headers: {
                  'Content-Type': 'application/json',
                }
              })
        return response.data;
    }
)





const adminProductSlice = createSlice({
    name:'products',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(getAllBrands.pending, (state) => {
            state.loading=true
            state.allBrands=[]
            state.error=''
        })
        builder.addCase(getAllBrands.fulfilled, (state,action)=>{
            state.loading=false
            state.allBrands=action.payload
            state.error=''
        })
        builder.addCase(getAllBrands.rejected, (state,action)=>{
            state.loading=false
            state.allBrands=[]
            state.error=action.error.message
        })
        builder.addCase(insertProducts.pending, (state) => {
            state.loading=true
            state.addProductData=''
            state.error=''
        })
        builder.addCase(insertProducts.fulfilled, (state,action)=>{
            state.loading=false
            state.addProductData=action.payload
            state.error=''
        })
        builder.addCase(insertProducts.rejected, (state,action)=>{
            state.loading=false
            state.addProductData=''
            state.error=action.error.message
        })
        builder.addCase(getAllProductsWithImages.pending, (state) => {
            state.loading=true
            state.productsWithImages={}
            state.error=''
        })
        builder.addCase(getAllProductsWithImages.fulfilled, (state,action)=>{
            state.loading=false
            state.productsWithImages=action.payload
            state.error=''
        })
        builder.addCase(getAllProductsWithImages.rejected, (state,action)=>{
            state.loading=false
            state.productsWithImages={}
            state.error=action.error.message
        })
        builder.addCase(updateProductAdmin.pending, (state) => {
            state.loading=true
            state.addProductData=''
            state.error=''
        })
        builder.addCase(updateProductAdmin.fulfilled, (state,action)=>{
            state.loading=false
            state.addProductData=action.payload
            state.error=''
        })
        builder.addCase(updateProductAdmin.rejected, (state,action)=>{
            state.loading=false
            state.addProductData=''
            state.error=action.error.message
        })
    }
})

export default adminProductSlice.reducer
export {getAllBrands, insertProducts, updateProductAdmin,getAllProductsWithImages}


