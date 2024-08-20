import React from "react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Map from "@/components/map/Map";

export default function Home() {
  return (
    <>
      <main id="main">
        <Header />
        <Sidebar />
        <Map />
      </main>
    </>
  )
}