'use client'

import React, { useEffect } from "react";
import { MapPage } from "../map/Map";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/context/store";
import fetchFlight from "@/context/action";



export const HomePage:React.FC = () => {
 

  
  return (
    <>
    <div className="container ">
       <div className="navbar ">
       <a href=""><span className="font-bold text-xl">Map View</span></a>
      <a href=""><span className="font-bold text-xl">List View</span></a>
      <hr className="hrnav" />
       </div>
    </div>
     <MapPage  />
    </>

  )
};
