'use client'
import { HomePage, MapPage } from "@/Components";
import Image from "next/image";
import { Provider } from "react-redux";
import store from '@/context/store'

export default function Home() {
  return (
    <Provider store={store}>

    <main className="">
       
       <HomePage/>
    </main>
    </Provider>
  );
}
