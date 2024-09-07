"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import Map from "@/components/map/Map";
import Login from "@/components/modal/LogIn";
import SignUp from "@/components/modal/SignUp";


export default function Home() {
  const { data: session } = useSession();
  // 지역검색 중심좌표 이동하기 위한 상태 관리
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.9780 }); // 초기 서울 중심좌표

  // 로그인 및 회원가입 모달 상태 관리
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignupVisible, setSignupVisible] = useState(false);

  // 사이드바 상태 관리
  const [sidebarContent, setSidebarContent] = useState('default');
  const [isSidebarVisible, setSidebarVisible] = useState('true');
  const [infoWindowContent, setInfoWindowContent] = useState(null);

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
        isSidebarVisible={isSidebarVisible}
        showSidebar={() => setSidebarVisible(true)}
        onClose={() => setSidebarVisible(false)}
        setCenter={setCenter}
        infoWindowContent={infoWindowContent}
      />
      <Map
        center={center}
        setInfoWindowContent={setInfoWindowContent}
      />
    </main>
  );
}
