
import { configureStore } from "@reduxjs/toolkit";
import flighReducer from './flightSlice'
 
 
 const store = configureStore({
    reducer:{
        flightList:flighReducer,

    }
 })



 
export default store;
 export type AppDispatch = typeof store.dispatch;
 export type RootState = ReturnType<typeof store.getState>;

