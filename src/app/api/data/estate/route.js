// app/api/real-estate/route.js

import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.ESTATE_API_KEY; // 환경 변수에서 API 키 가져오기
  const url = `https://api.example.com/real-estate?key=${API_KEY}`; // 실제 API URL로 수정

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}