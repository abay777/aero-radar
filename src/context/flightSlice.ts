
import { createSlice } from "@reduxjs/toolkit";
import fetchFlight from "./action";
import { act } from "react";

interface InitialState {
    flightData:any,
    path:any;
    loading:boolean;
    error:any;

}

const initialState:InitialState | null = {
    flightData:undefined,
    path:undefined,
    loading:false,
    error:null

}



const flightSlice = createSlice({
    name:"flight",
    initialState,
    reducers:{
        setPath:(state,payload:any)=>{
          state.path =  payload.path;

        }

    },
    extraReducers:(builder) => {
        builder.addCase(fetchFlight.pending, (state) => {
            state.loading = true;
            state.error = null;

        })
        .addCase(fetchFlight.fulfilled,(state, action)=>{
            state.loading=false;
            state.flightData = action.payload;
        })
        .addCase(fetchFlight.rejected,(state, action) => {
            state.loading=false;
            state.error=action.payload
        })

    }


})
 export const {setPath} =  flightSlice.actions;
 export default flightSlice.reducer