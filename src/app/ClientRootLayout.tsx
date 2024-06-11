'use client';
import React, { useState } from "react";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import store from "@/context/store";
import { Navbar } from "@/Components/Home/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

// Dynamically import the modal content component to avoid server-side rendering issues


export default function ClientRootLayout({
  children,
  viewMap,
  viewList,
}: {
  children: React.ReactNode;
  viewMap: React.ReactNode;
  viewList: React.ReactNode;
}) {
  const [view,setView] = useState<'list' |'map'> ('map')
 

  return (
    <div className={inter.className}>
      <Provider store={store}>
        <Navbar setView={setView}/>
        {view ==='map' ?(
         viewMap) :(
         viewList)}
       
      </Provider>
      
    </div>
  );
}
