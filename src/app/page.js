"use client"

import React, { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Map from "@/components/map/Map";
import Login from "@/components/login/Login";
import SignUp from "@/components/signup/Signup";
import KakaoLogin from "@/components/kakaologin/KakaoLogin";
import NaverLogin from "@/components/naverlogin/NaverLogin";

export default function Home() {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignupVisible, setSignupVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
  }, [])

  const showLogin = () => {
    setLoginVisible(!isLoginVisible);
  }

  const showSignup = () => {
    setSignupVisible(!isSignupVisible);
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // 로그인 성공 시 상태 업데이트
    setLoginVisible(false); // 로그인 모달 닫기
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
  }

  return (
    <>
      <main id="main">
        <Login
          isLoginVisible={isLoginVisible}
          onClose={() => setLoginVisible(false)}
          onSuccess={handleLoginSuccess} // 로그인 성공 시 호출할 함수 전달
          onLoginSuccess={handleLoginSuccess}
        >
        </Login>
        <Header
          isLoggedIn={isLoggedIn} // 로그인 상태 전달
          showLogin={showLogin}
          showSignup={showSignup}
          handleLogout={handleLogout}
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