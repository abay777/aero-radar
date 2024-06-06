"use client";

import { Inter } from "next/font/google";
import { Navbar } from "@/Components/Home/Navbar/Navbar";
import Providers from "@/context/providers";
import { useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function ClientRootLayout({
  viewMap,
  viewList,
}: {
  viewMap: React.ReactNode;
  viewList: React.ReactNode;
}) {
  const [view, setView] = useState<'map' | 'list'>('map');

  const handleSetView = (view: 'map' | 'list') => {
    setView(view);
  };

  return (
    <Providers>
      <Navbar setView={handleSetView} />
      <div style={{ display: 'flex' }}>
        {view === 'map' && <div style={{ flex: 1 }}>{viewMap}</div>}
        {view === 'list' && <div style={{ flex: 1 }}>{viewList}</div>}
      </div>
    </Providers>
  );
}
