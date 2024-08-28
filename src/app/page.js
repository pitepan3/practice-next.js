"use client"

import React, { useEffect, useState } from "react";
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
  const [allProperties, setAllProperties] = useState([]);

  const handleSearch = () => { // 검색기능
    const results = allProperties.filter(
      (property) =>
        property.info.includes(searchQuery) ||
        property.price.toString().includes(searchQuery)
    );
    setFilteredProperties(results);
  };

  // ========== sidebar 검색관련 ==========

  // ========== sidebar ==========

  // 부동산 관련 공공데이터API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/estate');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data);

        // 데이터 가공
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, []);
  // 부동산 관련 공공데이터API


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