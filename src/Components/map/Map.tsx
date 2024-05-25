'use client'
import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
 import "leaflet/dist/leaflet.css"
 import { LatLngExpression } from 'leaflet';




 export function Map() {
     const [position, setPosition] = useState(null)
     const LocationMarker = () => {
         const map = useMapEvents({
           click() {
             map.locate()
           },
           locationfound(e:any) {
             setPosition(e.latlng)
             map.flyTo(e.latlng, map.getZoom())
           },
         })
       
         return position === null ? null : (
           <Marker position={position}>
             <Popup>You are here</Popup>
             {LocationMarker()}
           </Marker>
         )
    }
        
  
  
return (
    <>
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
    </MapContainer>
    </>

)
}