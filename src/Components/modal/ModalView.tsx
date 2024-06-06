"use client"
import Image from "next/image";
import React from "react";
import { WiDayCloudy } from "react-icons/wi";


export const ModalView:React.FC = () => {
  return (
    <>
        <section className="w-[35rem] h-[10rem] px-2 py-3">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl font-bold ">flight name</h1>
                {/* <Image src={"https://source.unsplash.com?flight" } 
                alt="flight image"
                width={200}
                height={200}
                quality={100}/> */}
                <img src="https://source.unsplash.com?flight" alt="" />
            </div>
            
        </section>
    </>
  )
};
