"use client";

import React from "react";
import Header from "@/components/Header";
import Map from "@/components/Map";
import Sidebar from "@/components/Sidebar";
import LoginModal from "@/components/LoginModal";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" role="main">
        <Sidebar />
        <Map />
        <LoginModal />
      </main>
    </>
  )
}