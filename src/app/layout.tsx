import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientRootLayout from "./ClientRootLayout";
import { Navbar } from "@/Components/Home/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: " Indian flight tracker",
  description: "flight tracker will provide realtime data to see whether the flight is on realtime ",
};

export default function RootLayout({
  children,
  viewMap,
  viewList,
}: {
  children: React.ReactNode;
  viewMap: React.ReactNode;
  viewList: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <ClientRootLayout viewMap={viewMap} viewList={viewList}>
        
          {children}
        </ClientRootLayout>
      </body>
    </html>
  );
}
