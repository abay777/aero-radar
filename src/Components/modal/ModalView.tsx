"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";
import { clearPath, setPath } from "@/context/flightSlice";
import formatDate from "@/utility/formatdate";
import { headers } from "@/config/config";
import { RootState } from "@/context/store";

interface Props {
  flightCode: string | undefined;
  setModal: any;
}

export const ModalView: React.FC<Props> = ({ flightCode, setModal }) => {
  const [flightData, setFlightData] = useState<any>(null);
  const [loading, setloading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const path = useSelector((state:RootState)=>state.flightList.path)

  const handleClose = () => {
    setModal(false);
    dispatch(clearPath());
  }
  useEffect(() => {
    if (!flightCode) return;

    axios
      .request({
        method: "GET",
        url: "https://flight-radar1.p.rapidapi.com/flights/detail",
        params: { flight: flightCode },
        headers,
      })
      .then((res) => {
        setFlightData(res.data);
        setloading(false);
        dispatch(setPath(res.data.trail));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setloading(false);
      });

    return () => {
      setFlightData(null);
    };
  }, [flightCode, dispatch,setModal]);

  if (!flightData) return <div>Loading...</div>;

  const { aircraft, images, airport, time } = flightData;
  const aircraftModel = aircraft?.model?.text || "Not available";
  const aircraftCode = aircraft?.model?.code || "Not available";
  const sideviewImage = aircraft?.images?.large[0].src;
  const origin = airport?.origin?.name || "Not available";
  const originCountry =
    airport?.origin?.position?.country?.name || "Not available";
  const destination = airport?.destination?.name || "Not available";
  const destinationCountry =
    airport?.destination?.position?.country?.name || "Not available";
  const departureTime = time?.scheduled?.departure
    ? formatDate(time.scheduled.departure)
    : "Not available";
  const arrivalTime = time?.scheduled?.arrival
    ? formatDate(time.scheduled.arrival)
    : "Not available";

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center mt20">
          <Image
            src={"/flight landing.gif"}
            width={200}
            height={200}
            alt="✈️"
          />
        </div>
      ) : (
        <section className="w-full bottom-0 top-15 md:bottom-[10%] lg:top-10 lg:bottom-0 md:top-[20%] md:w-[20rem]  px-2 py-3  md:left-0 fixed  z-[1000] bg-black rounded-lg border-white border-2">
          <div
            onClick={() => handleClose()}
            className="flex justify-between px-4 items-center mb-3 bg-red-400 hover:bg-red-600 duration-150 ease-linear rounded-lg"
          >
            <span className="text-base">close</span>
            <span className="text-lg">x</span>
          </div>
          <div className="flex flex-col justify-center items-center mx-10 md:mx-4">
            <h1 className="text-xl font-bold">{aircraftModel}</h1>
            <p className="text-center text-sm font-bold text-gray-600">
              {aircraftCode}
            </p>
            <Image
              src={sideviewImage}
              className="w-full h-[10rem] object-cover rounded-xl"
              alt="flight image"
              width={200}
              height={200}
              quality={100}
            />
          </div>
          <div className="mx-10 md:mx-4">
            <h3 className="text-lg text-blue-400 text-center font-extrabold">
              Departed - details (origin)
            </h3>
            <p className="text-gray-600 font-semibold text-center">{origin}</p>
            <p className="text-gray-600 font-semibold text-center">
              Country: {originCountry}
            </p>
            <p className="text-gray-600 font-semibold text-center">
              <span className="font-bold text-gray-400">Departed Time: </span>
              {departureTime}
            </p>
          </div>
          <div className="mx-10 md:mx-4">
            <h3 className="text-lg text-green-300 text-center font-extrabold">
              Arrival - details (destination)
            </h3>
            <p className="text-gray-600 font-semibold text-center">
              {destination}
            </p>
            <p className="text-gray-600 font-semibold text-center">
              Country: {destinationCountry}
            </p>
            <p className="text-gray-600 font-semibold text-center">
              <span className="font-bold text-gray-400">Arrival Time: </span>
              {arrivalTime}
            </p>
          </div>
          <div className="m5-10 md:mt-4">
            <p className="w-full ">
              <span
                className={`px-2 py-3 block text-center rounded-md w-full mt-2 ${flightData.status.icon}`}
              >
                {flightData.status.text}
              </span>
            </p>
          </div>
        </section>
      )}
    </>
  );
};
