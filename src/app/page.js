"use client"

import React, { useState } from "react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Map from "@/components/map/Map";
import Login from "@/components/login/Login";
import SignUp from "@/components/signup/Signup";

export default function Home() {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignupVisible, setSignupVisible] = useState(false);
  
  const toggleLogin = () => {
    setLoginVisible(!isLoginVisible);
  }

  const toggleSignup = () => {
    setSignupVisible(!isSignupVisible);
  }

  return (
    <>
      <main id="main">
        <Header toggleLogin={toggleLogin} toggleSignup={toggleSignup} />
        <Login isLoginVisible={isLoginVisible} />
        <SignUp isSignupVisible={isSignupVisible} />
        <Sidebar />
        <Map />
      </main>
    </>
  )
}