'use client';
import React, { useCallback, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from 'leaflet';
import { renderToString } from "react-dom/server";
import L from 'leaflet';
import Image from "next/image";
import bigFlight from '@/../../public/big flight.png';
import smallFlight from '@/../../public/small flight.png';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/context/store";
import fetchFlight from "@/context/action";

export interface FormattedResponse {
  id: any;
  code: any;
  position:LatLngExpression;
  lat: number;
  lon: number;
  airCraftType:any;
}



export const MapPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { flightData ,loading, error } = useSelector((state: RootState) => state.flightList);
  const initialPosition: LatLngExpression = [10.7867, 76.6548];
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const [flights, setFlights] = useState<FormattedResponse[] | null|undefined>(undefined);

  useEffect(() => {
    dispatch(fetchFlight())
    
  },[dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching flight data:", error);
    }
    if (!loading && flightData) {
      console.log('Fetched Flight Data:', flightData); // Debugging
      setFlights(flightData);
      
    }
  }, [loading, flightData, error]);

  const BigFlightIconComponent = useCallback(() => (
    <div style={{ fontSize: '24px' }}>
      <Image src={bigFlight} alt="big flight" width={22} height={22} />
    </div>
  ), []);

  const SmallFlightIconComponent = useCallback(() => (
    <div style={{ fontSize: '24px' }}>
      <Image src={smallFlight} alt="small flight" width={15} height={15} />
    </div>
  ), []);

  const bigFlightIconHtml = renderToString(<BigFlightIconComponent />);
  const smallFlightIconHtml = renderToString(<SmallFlightIconComponent />);
  const smallFlightIcon = new L.DivIcon({
    html: smallFlightIconHtml,
    className: '',
    iconSize: [30, 42],
    iconAnchor: [15, 42]
  });

  const bigFlightIcon = new L.DivIcon({
    html: bigFlightIconHtml,
    className: '',
    iconSize: [30, 42],
    iconAnchor: [15, 42]
  });

  return (
    <>
      <MapContainer
        center={initialPosition}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full min-h-[46rem] max-h-screen lg:max-h-[20rem]  mt-5 "
      >
        <TileLayer
          className="mapStyle"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        />
        {flights && flights.map((plane: FormattedResponse,index) => {
          // Check if lat and lang are valid numbers
          
            return (
              <Marker key={plane.id} position={plane.position} icon={bigFlightIcon}>
                <Popup>
                  <div className="flex flex-col justify-center rounded-2xl items-center">
                    <h1 className="font-bold ">{plane.airCraftType}</h1>
                    <div className="flex flex-col justify-center gap-4 items-center">
                      <button className="bg-black text-white px-4 py-2 font-semibold w-full">details</button>
                      <button className="bg-black text-white px-4 py-2 font-semibold w-full">list</button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          
           // Do not render marker if coordinates are invalid
        })}
      </MapContainer>
    </>
  );
};
