"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import Map from "@/components/map/Map";
import Login from "@/components/modal/LogIn";
import SignUp from "@/components/modal/SignUp";


export default function Home () {
  const { data: session } = useSession();

  // 로그인 및 회원가입 모달 상태 관리
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignupVisible, setSignupVisible] = useState(false);

  // 사이드바 상태 관리
  const [sidebarContent, setSidebarContent] = useState('default');



  // 부동산 관련 공공데이터 API 호출
  const [estateData, setEstateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstateData = async () => {
      try {
        const response = await fetch('/api/estate');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setEstateData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEstateData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  

  return (
    <main id="main">
      <Login
        isLoginVisible={isLoginVisible}
        onClose={() => setLoginVisible(false)}
      />
      <Header
        isLoggedIn={!!session}
        showLogin={() => setLoginVisible(!isLoginVisible)}
        showSignup={() => setSignupVisible(!isSignupVisible)}
      />
      <SignUp
        isSignupVisible={isSignupVisible}
        onClose={() => setSignupVisible(false)}
      />
      <Sidebar
        content={sidebarContent}
        setSidebarContent={setSidebarContent}
      />
      <Map />
    </main>
  );
}
