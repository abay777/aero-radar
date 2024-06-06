'use client'
import { HomePage, MapPage } from "@/Components";
import Image from "next/image";
import { Provider } from "react-redux";
import store from '@/context/store'
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Select a view from above to display the Map or List view.</p>
    </div>
  );
}

