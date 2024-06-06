'use client'
import Link from "next/link";
import React from "react";

export function Navbar({setView}:{ setView: (view: 'map' | 'list') => void }) {
  return <div className="container ">
       <div className="navbar  ">
       <button onClick={() => setView('map')}><span className="font-bold text-xl ">Map View</span></button>
      <button onClick={() => setView('list')}><span className="font-bold text-xl " >List View</span></button>
      <hr className="hrnav" />
       </div>
    </div>;
}
  