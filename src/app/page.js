"use client"

import React from "react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Map from "@/components/map/Map";
import Login from "@/components/login/Login";
import SignUp from "@/components/signup/SignUp";

export default function Home() {
  return (
    <>
      <main id="main">
        <Login />
        <SignUp />
        <Header />
        <Sidebar />
        <Map />
      </main>
    </>
  )
}