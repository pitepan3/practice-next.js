"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import Map from "@/components/map/Map";
import Login from "@/components/modal/LogIn";
import SignUp from "@/components/modal/SignUp";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

// React Query 클라이언트 설정
const queryClient = new QueryClient();

export default function Home() {
  return (
    // QueryClientProvider를 최상위에 위치시킵니다.
    <QueryClientProvider client={queryClient}>
      <HomeContent />
    </QueryClientProvider>
  );
}

// 실제 컴포넌트의 콘텐츠를 별도로 정의합니다.
function HomeContent() {
  const { data: session } = useSession();

  // 로그인 및 회원가입 모달 상태 관리
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignupVisible, setSignupVisible] = useState(false);

  // 사이드바 상태 관리
  const [sidebarContent, setSidebarContent] = useState('default');

  // 부동산 관련 공공데이터 API 호출 (React Query 사용)
  const { data: estateData, error, isLoading } = useQuery({
    queryKey: ['estateData'], // 쿼리 키
    queryFn: async () => {
      const response = await fetch('/api/estate');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;
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
