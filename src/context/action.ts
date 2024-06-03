
import { options } from "@/config/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


const fetchFlight = createAsyncThunk('flight/flightList',async(_,thunkAPI) => {
    try {
        const response:AxiosResponse =await  axios.request(options as AxiosRequestConfig);
        const formatted = response.data.aircraft.map((item:any) => ({
            id: item[0],
            code: item[1],
            position:[item[2],item[3]],
            lat: Number(item[2]),
            lon:Number( item[3]),
            airCraftType:String(item[9])
          }));
          
          return formatted;
    } catch (error:any) {
        if(axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.response?.data || 'error while fetching flight data')
        }else {
            return thunkAPI.rejectWithValue('An unexpected error occurred in Fetchflight')
        }
        
        
    }

})

export default fetchFlight;