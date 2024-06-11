"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Image from "next/image";
import { setPath } from "@/context/flightSlice";
import formatDate from "@/utility/formatdate";
import { headers } from "@/config/config";

interface Props {
  flightCode: string | undefined;
  setModal: any;
}

export const ModalView: React.FC<Props> = ({ flightCode, setModal }) => {
  const [flightData, setFlightData] = useState<any>(null);
  const [loading, setloading] = useState<boolean>(true);
  const dispatch = useDispatch();

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
        console.log(res.data);
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
  }, [flightCode, dispatch]);

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
        <div className="loader"></div>
      ) : (
        <section className="w-full sm:min-h-screen md:w-[20rem] md:max-h-fit px-2 py-3 md:top-10 md:left-0 fixed  z-[1000] bg-black rounded-lg border-white border-2">
          <div
            onClick={() => setModal(false)}
            className="flex justify-between px-4 items-center mb-3 bg-red-400 hover:bg-red-600 duration-150 ease-linear rounded-lg"
          >
            <span className="text-base">close</span>
            <span className="text-lg">x</span>
          </div>
          <div className="flex flex-col justify-center items-center">
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
          <div className="mt-3">
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
          <div className="mt-3">
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
          <div>
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
