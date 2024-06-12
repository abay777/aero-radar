
import { createSlice } from "@reduxjs/toolkit";
import fetchFlight from "./action";
import { LatLng } from "leaflet";

interface InitialState {
    flightData:any;
    path:LatLng[] | undefined| null;
    loading:boolean;
    error:any;

}

const initialState:InitialState | null = {
    flightData:undefined,
    path:null,
    loading:false,
    error:null

}



const flightSlice = createSlice({
    name:"flight",
    initialState,
    reducers:{
        setPath:(state,payload:{payload:any, type:string})=>{
          state.path = [payload.payload]
          

        },
        clearPath:(state)=>{
            state.path=null;
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
 export const {setPath, clearPath} =  flightSlice.actions;
 export default flightSlice.reducer