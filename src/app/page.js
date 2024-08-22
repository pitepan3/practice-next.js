"use client"

import React from "react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Map from "@/components/map/Map";
import KakaoLogin from "@/components/kakaologin/KakaoLogin";

export default function Home() {
  return (
    <>
      <main id="main">
        {/* <KakaoLogin /> */}
        <Header />
        <Sidebar />
        <Map />
      </main>
    </>
  )
}