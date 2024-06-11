"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression, divIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import L from "leaflet";
import Image from "next/image";
import bigFlight from "@/../../public/big flight.png";
import smallFlight from "@/../../public/small flight.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/context/store";
import fetchFlight from "@/context/action";
import { ModalView } from "../modal/ModalView";
import Link from "next/link";

export interface FormattedResponse {
  id: any;
  code: any;
  position: LatLngExpression;
  lat: number;
  lon: number;
  airCraftType: any;
}

export const MapPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { flightData, loading, error, path } = useSelector(
    (state: RootState) => state.flightList
  );
  const initialPosition: LatLngExpression = [10.7867, 76.6548];
  const [flights, setFlights] = useState<
    FormattedResponse[] | null | undefined
  >(undefined);
  const [modal, setModal] = useState<boolean>(false);
  const [flightCode, setFlightCode] = useState<string>("");

  const handleClick = (code: string) => {
    setModal(false);
    setFlightCode(code);
    setModal(true);
  };

  useEffect(() => {
    dispatch(fetchFlight());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching flight data:", error);
    }
    if (!loading && flightData) {
      setFlights(flightData);
    }
  }, [loading, flightData, error]);

  const BigFlightIconComponent = useCallback(
    () => (
      <div style={{ fontSize: "24px" }}>
        <Image src={bigFlight} alt="big flight" width={22} height={22} />
      </div>
    ),
    []
  );

  const bigFlightIconHtml = renderToString(<BigFlightIconComponent />);

  const bigFlightIcon = new L.DivIcon({
    html: bigFlightIconHtml,
    className: "",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });

  return (
    <>
      {error ? (
        <section>
          <p className="font-semibold text-red-400 animate-pulse text-xl text-center">
            😭sorry we found that Flight details is currently suspended due to
            high usage
          </p>
          <MapContainer
            center={initialPosition}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full min-h-[46rem] max-h-screen lg:max-h-[20rem] mt-5 z-[10]"
          >
            <TileLayer
              className="mapStyle"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
            />
            {flights &&
              flights.map((plane: FormattedResponse) => (
                <Marker
                  key={plane.id}
                  position={plane.position}
                  icon={bigFlightIcon}
                >
                  <Popup>
                    <div className="flex flex-col justify-center rounded-2xl items-center">
                      <h1 className="font-bold">{plane.airCraftType}</h1>
                      <div className="flex flex-col justify-center gap-4 items-center">
                        <button
                          onClick={() => handleClick(plane.id)}
                          className="bg-black text-white px-4 py-2 font-semibold w-full"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            {path && <Polyline positions={path} />}
            {modal && <ModalView flightCode={flightCode} setModal={setModal} />}
          </MapContainer>
        </section>
      ) : loading ? (
        <div className="flex justify-center items-center w-full mt-40">
          <div className="loader"></div>
        </div>
      ) : (
        <MapContainer
          center={initialPosition}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full min-h-[46rem] max-h-screen lg:max-h-[20rem] mt-5 z-[10]"
        >
          <TileLayer
            className="mapStyle"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
          />
          {flights &&
            flights.map((plane: FormattedResponse) => (
              <Marker
                key={plane.id}
                position={plane.position}
                icon={bigFlightIcon}
              >
                <Popup>
                  <div className="flex flex-col justify-center rounded-2xl items-center">
                    <h1 className="font-bold">{plane.airCraftType}</h1>
                    <div className="flex flex-col justify-center gap-4 items-center">
                      <button
                        onClick={() => handleClick(plane.id)}
                        className="bg-black text-white px-4 py-2 font-semibold w-full"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          {path && <Polyline positions={path} />}
          {modal && <ModalView flightCode={flightCode} setModal={setModal} />}
        </MapContainer>
      )}
    </>
  );
};
