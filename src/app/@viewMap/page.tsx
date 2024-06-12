"use client"
import dynamic from "next/dynamic";
import React from "react";
const MapPage = dynamic(() => import('@/Components/map/Map'), { ssr: false });

const viewMap:React.FC = () => {
 
  return (
    <main>
       <MapPage/>
       
    </main>
  );
};

export default viewMap;
