'use client'
import { Provider } from "react-redux";
import store from "@/context/store";
import React, { useEffect } from "react";





export const HomePage:React.FC = () => {


  
  return (
    <>
 <Provider store={store}>
   <div>

   </div>
  </Provider>   
     
    </>

  )
};
