"use client"

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Map from "@/components/map/Map";
import Login from "@/components/login/Login";
import SignUp from "@/components/signup/Signup";

export default function Home() {
  const { data: session } = useSession();
  
  // ========== 로그인모달, 회원가입모달 ==========
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignupVisible, setSignupVisible] = useState(false);

  const showLogin = () => {
    setLoginVisible(!isLoginVisible);
  }

  const showSignup = () => {
    setSignupVisible(!isSignupVisible);
  }
  // ========== 로그인모달, 회원가입모달 ==========

  // ========== sidebar ==========
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const showSidebar = () => {
    setSidebarVisible(true)
  }

  const hideSidebar = () => {
    setSidebarVisible(false)
  }
  // ========== sidebar ==========


  return (
    <>
      <main id="main">
        <Login
          isLoginVisible={isLoginVisible}
          onClose={() => setLoginVisible(false)}
        >
        </Login>
        <Header
          isLoggedIn={!!session}
          showLogin={showLogin}
          showSignup={showSignup}
        />
        <SignUp
          isSignupVisible={isSignupVisible}
          onClose={() => setSignupVisible(false)}
        />
        <Sidebar 
          isSidebarVisible={isSidebarVisible}
          showSidebar={showSidebar}
          hideSidebar={hideSidebar}
        />
        <Map />
      </main>
    </>
  )
}