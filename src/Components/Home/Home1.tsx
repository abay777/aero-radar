"use client"

import axios from "axios";
import { Erica_One } from "next/font/google";
import React, { EventHandler, UIEventHandler, useEffect } from "react";

export const Home1:React.FC = () => {
    
  const options = {
    method: 'GET',
    url: 'https://flight-radar1.p.rapidapi.com/airports/list',
    headers: {
      'x-rapidapi-key': 'e54ab82796mshbcf6a3471888070p143e4fjsn4d1224fd39ab',
      'x-rapidapi-host': 'flight-radar1.p.rapidapi.com'
    }
  };
  const apiInvoker:React.UIEventHandler = async() => {

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
   

  return <div>
    <div>
        <button onClick={apiInvoker} className="px-4 py-3 bg-green-400 font-bold"> check</button>
    </div>
  </div>;
};
