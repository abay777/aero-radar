
import { createSlice } from "@reduxjs/toolkit";
import fetchFlight from "./action";
import { act } from "react";

interface InitialState {
    flightData:any,
    loading:boolean;
    error:any;

}

const initialState:InitialState | null = {
    flightData:undefined,
    loading:false,
    error:null

}



const flightSlice = createSlice({
    name:"flight",
    initialState,
    reducers:{

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

 export default flightSlice.reducer