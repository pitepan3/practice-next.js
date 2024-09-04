"use client"

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ReactQueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 신선하게 유지
        cacheTime: 1000 * 60 * 10, // 10분 동안 캐시에 데이터 유지
        refetchOnWindowFocus: false, // 창이 다시 포커스될 때 리패치 비활성화
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
