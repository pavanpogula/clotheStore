import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import userReducer from "../user/userSlice"
import adminProductSlice from '../product/adminProductSlice'
const logger = createLogger()
const store = configureStore(
    {
        reducer:{
            user:userReducer,
            adminProducts:adminProductSlice
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
      }
)

export default store