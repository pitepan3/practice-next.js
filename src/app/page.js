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

  const showLogin = () => {
    setLoginVisible(!isLoginVisible);
  }

  const showSignup = () => {
    setSignupVisible(!isSignupVisible);
  }

  return (
    <>
      <main id="main">
        <Header
          showLogin={showLogin} showSignup={showSignup}
        />
        <Login
          isLoginVisible={isLoginVisible}
          onClose={() => setLoginVisible(false)}
        />
        <SignUp
          isSignupVisible={isSignupVisible}
          onClose={() => setSignupVisible(false)}
        />
        <Sidebar />
        <Map />
      </main>
    </>
  )
}