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
  const [sidebarContent, setSidebarContent] = useState('default');

  const showSidebar = () => {
    setSidebarVisible(true);
  }

  const hideSidebar = () => {
    setSidebarVisible(false);
  }

  const handleMyHouseClick = () => {
    setSidebarContent('myHouse');
    showSidebar();
  }

  const findRealPrices = () => {
    setSidebarContent('findRealPrices');
    showSidebar();
  }

  const estateProperty = () => {
    setSidebarContent('estateProperty');
    showSidebar();
  }

  // ========== sidebar 검색관련 ==========
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);

  const allProperties = [ // 임의의 매물 데이터 (실제 환경에서는 서버나 API 호출로 대체)
    { lat: 33.450701, lng: 126.570667, info: "매물 1", price: 1000 },
    { lat: 33.450936, lng: 126.569477, info: "매물 2", price: 1500 },
    { lat: 33.450879, lng: 126.569940, info: "매물 3", price: 2000 },
  ];

  const handleSearch = () => { // 검색기능
    const results = allProperties.filter(
      (property) =>
        property.info.includes(searchQuery) ||
        property.price.toString().includes(searchQuery)
    )
    setFilteredProperties(results)
  }

  // ========== sidebar 검색관련 ==========

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
          content={sidebarContent}
          setSidebarContent={setSidebarContent}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        <Map properties={filteredProperties} />
      </main>
    </>
  )
}