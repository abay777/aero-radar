'use client';

import { RootState } from "@/context/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FormattedResponse } from "../map/Map";
import { ModalView } from "../modal/ModalView";
import Image from "next/image";

export const ListView: React.FC = () => {
  const [flightCode, setFlightCode] = useState<string>("");
  const { flightData, loading, error } = useSelector(
    (state: RootState) => state.flightList
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modal, setModal] = useState<boolean>(false);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFlightData = flightData ? flightData.slice(indexOfFirstItem, indexOfLastItem) : [];

  const handleBgClick = () => {
    if (modal) {
      setModal(false);
    }
  };

  const handleClick = (code: any) => {
    setModal(false);
    setFlightCode(code);
    setModal(true);
  };

  return (
    <>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : error ? (
        <div className="flex flex-col justify-center mt-16 items-center">
          <Image 
          width={300}
          height={300}
          src={'/cryingEmoji.gif'}
          alt="😭"/>
          <p className="text-2xl font-mono font-semibold text-wrap mx-10 text-red-500">sorry because of high usage , we are suspended for a short while</p>
        </div>
      ) : (
        <section className="p-0 mt-10 relative">
          <div className="tableContainer w-full overflow-x-auto">
            <table onClick={handleBgClick} className="w-[90%]">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="p-4 text-center border text-wrap text-lg">
                    Details
                  </th>
                  <th className="p-4 text-center border text-wrap text-lg">
                    ID
                  </th>
                  <th className="p-4 text-center border text-wrap text-lg">
                    Flight Code
                  </th>
                  <th className="p-4 text-center border text-wrap text-lg">
                    Latitude
                  </th>
                  <th className="p-4 text-center border text-wrap text-lg">
                    Longitude
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentFlightData &&
                  currentFlightData.map((plane: FormattedResponse) => (
                    <tr
                      key={plane.id}
                      className="even:bg-gray-500 cursor-pointer"
                    >
                      <td
                        onClick={() => handleClick(plane.id)}
                        className="bg-orange-300 m-2 text-black font-bold text-center border rounded-3xl hover:bg-orange-950"
                      >
                        Show
                      </td>
                      <td className="p-4 text-center border">{plane.id}</td>
                      <td className="p-4 text-center border">{plane.code}</td>
                      <td className="p-4 text-center border">{plane.lat}</td>
                      <td className="p-4 text-center border">{plane.lon}</td>
                    </tr>
                  ))}
              </tbody>
              <div className="block w-[20rem] lg:w-[50rem] mt-5 translate-x-[50%] lg:translate-x-4 xl:translate-x-40 overflow-x-auto">
                {Array.from({ length: Math.ceil(flightData?.length / itemsPerPage || 0) }).map((_, index) => (
                  <span
                    onClick={() => setCurrentPage(index + 1)}
                    key={index}
                    className="px-1 mx-3 font-bold hover:bg-blue-500 border-white border-2"
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
            </table>
          </div>
          {modal ? (
            <ModalView flightCode={flightCode} setModal={setModal} />
          ) : null}
        </section>
      )}
    </>
  );
};
