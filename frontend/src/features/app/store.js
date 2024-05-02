import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import userReducer from "../user/userSlice"
import adminProductSlice from '../product/adminProductSlice'
import customerProductSlice from '../product/customerProductSlice'
import  customerRegsterReducer  from '../customer/customerSlice'
const logger = createLogger()
const store = configureStore(
    {
        reducer:{
            user:userReducer,
            adminProducts:adminProductSlice,
            customerAddedProducts:customerProductSlice,
            userRegister: customerRegsterReducer
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
      }
)

export default store