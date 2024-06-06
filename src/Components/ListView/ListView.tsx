'use client';

import { RootState } from '@/context/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FormattedResponse } from '../map/Map';
import { Playpen_Sans } from 'next/font/google';
import Link from 'next/link';
const flightData: FormattedResponse[] = [
  {
    id: 1,
    code: "ABC123",
    position: [40.7128, -74.0060], // Example latitude and longitude
    lat: 40.7128,
    lon: -74.0060,
    airCraftType: "Boeing 737",
  },
  {
    id: 2,
    code: "XYZ456",
    position: [34.0522, -118.2437], // Example latitude and longitude
    lat: 34.0522,
    lon: -118.2437,
    airCraftType: "Airbus A320",
  },
  // Add more fake data objects as needed
  {
    id: 3,
    code: "DEF789",
    position: [51.5074, -0.1278], // Example latitude and longitude
    lat: 51.5074,
    lon: -0.1278,
    airCraftType: "Boeing 747",
  },
  {
    id: 4,
    code: "GHI987",
    position: [48.8566, 2.3522], // Example latitude and longitude
    lat: 48.8566,
    lon: 2.3522,
    airCraftType: "Airbus A380",
  },
  {
    id: 5,
    code: "JKL321",
    position: [52.5200, 13.4050], // Example latitude and longitude
    lat: 52.5200,
    lon: 13.4050,
    airCraftType: "Boeing 787",
  },
  {
    id: 6,
    code: "MNO654",
    position: [55.7558, 37.6173], // Example latitude and longitude
    lat: 55.7558,
    lon: 37.6173,
    airCraftType: "Airbus A330",
  },
  {
    id: 7,
    code: "PQR987",
    position: [59.3293, 18.0686], // Example latitude and longitude
    lat: 59.3293,
    lon: 18.0686,
    airCraftType: "Boeing 777",
  },
  {
    id: 8,
    code: "STU321",
    position: [45.4642, 9.1900], // Example latitude and longitude
    lat: 45.4642,
    lon: 9.1900,
    airCraftType: "Airbus A350",
  },
  {
    id: 9,
    code: "VWX654",
    position: [37.7749, -122.4194], // Example latitude and longitude
    lat: 37.7749,
    lon: -122.4194,
    airCraftType: "Boeing 757",
  },
  {
    id: 10,
    code: "YZA987",
    position: [35.6895, 139.6917], // Example latitude and longitude
    lat: 35.6895,
    lon: 139.6917,
    airCraftType: "Airbus A340",
  },
  // Add more fake data objects as needed
  {
    id: 11,
    code: "BCD123",
    position: [52.3667, 4.8945], // Example latitude and longitude
    lat: 52.3667,
    lon: 4.8945,
    airCraftType: "Boeing 767",
  },
  {
    id: 12,
    code: "EFG456",
    position: [37.9838, 23.7275], // Example latitude and longitude
    lat: 37.9838,
    lon: 23.7275,
    airCraftType: "Airbus A310",
  },
  {
    id: 13,
    code: "HIJ789",
    position: [55.7558, 37.6173], // Example latitude and longitude
    lat: 55.7558,
    lon: 37.6173,
    airCraftType: "Boeing 757",
  },
  {
    id: 14,
    code: "KLM321",
    position: [34.0522, -118.2437], // Example latitude and longitude
    lat: 34.0522,
    lon: -118.2437,
    airCraftType: "Airbus A320",
  },
  {
    id: 15,
    code: "NOP654",
    position: [40.7128, -74.0060], // Example latitude and longitude
    lat: 40.7128,
    lon: -74.0060,
    airCraftType: "Boeing 747",
  },
  {
    id: 16,
    code: "QRS987",
    position: [51.5074, -0.1278], // Example latitude and longitude
    lat: 51.5074,
    lon: -0.1278,
    airCraftType: "Airbus A380",
  },
  {
    id: 17,
    code: "TUV321",
    position: [48.8566, 2.3522], // Example latitude and longitude
    lat: 48.8566,
    lon: 2.3522,
    airCraftType: "Boeing 787",
  },
  {
    id: 18,
    code: "VWX654",
    position: [55.7558, 37.6173], // Example latitude and longitude
    lat: 55.7558,
    lon: 37.6173,
    airCraftType: "Airbus A330",
  },
  {
    id: 19,
    code: "YZA987",
    position: [59.3293, 18.0686], // Example latitude and longitude
    lat: 59.3293,
    lon: 18.0686,
    airCraftType: "Boeing 777",
  },
  {
    id: 20,
    code: "BCD123",
    position: [45.4642, 9.1900], // Example latitude and longitude
    lat: 45.4642,
    lon: 9.1900,
    airCraftType: "Airbus A350",
  },
  // Add more fake data objects as needed
  {
    id: 21,
    code: "EFG456",
    position: [37.7749, -122.4194], // Example latitude and longitude
    lat: 37.7749,
    lon: -122.4194,
    airCraftType: "Boeing 737",
  },
  // Add more fake data objects as needed
];


export const ListView: React.FC = () => {
  const { loading, error } = useSelector((state: RootState) => state.flightList);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFlightData = flightData.slice(indexOfFirstItem,indexOfLastItem)
  return (
    <section className="p-0 mt-10">
      <div className="tableContainer w-full overflow-x-auto">
        <table className=" w-[90%]  ">
          <thead>
            <tr className="bg-green-600 text-white ">
              <th className="p-4 text-center border text-wrap  text-lg">ID</th>
              <th className="p-4 text-center border text-wrap  text-lg">Flight Code</th>
              <th className="p-4 text-center border text-wrap  text-lg">Latitude</th>
              <th className="p-4 text-center border text-wrap text-lg">Longitude</th>
            </tr>
          </thead>
          <tbody>
            {currentFlightData && currentFlightData.map((plane:FormattedResponse)=>{
              return (
              <tr key={plane.id} className="even:bg-gray-500">
                <td className="p-4 text-center border">
                  <Link href={'/modal'}>{plane.id}</Link></td>
                <td className="p-4 text-center border">{plane.code}</td>
                <td className="p-4 text-center border">{plane.lat}</td>
                <td className="p-4 text-center border">{plane.lon}</td>
              </tr>
              )
            })}
          </tbody>
            <div className='block w-[20rem] lg:w-[50rem] mt-5 translate-x-[50%] lg:translate-x-4 xl:translate-x-40 overflow-x-auto ' >
            {flightData.map((plane: FormattedResponse, index: number) => (
              <span
                onClick={() => setCurrentPage(index + 1)}
                key={index}
                className='px-1 mx-3 font-bold hover:bg-blue-500 border-white border-2'
              >
                {index + 1}
              </span>
            ))}
          </div>
        </table>
      </div>
    </section>
  );
};
