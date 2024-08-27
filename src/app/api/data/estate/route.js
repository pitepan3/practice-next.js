import { NextResponse } from 'next/server';

// 지역 코드 목록 (예시로 몇 개만 포함)
const REGION_CODES = [
  '11000', // 서울
  '26000', // 부산
  '27000', // 대구
  // 필요한 만큼 추가
];

export async function GET(request) {
  const API_KEY = process.env.NEXT_PUBLIC_PUBLIC_RENTAL_HOUSE_KEY;
  const requests = REGION_CODES.map((regionCode) => {
    const apiUrl = `https://api.odcloud.kr/api/RealEstateTradingSvc/v1/getRealEstateTradingArea?page=1&perPage=10&cond[RESEARCH_DATE::LTE]=202112&cond[RESEARCH_DATE::GTE]=202101&cond[REGION_CD::EQ]=${regionCode}&cond[DEAL_OBJ::EQ]=01&serviceKey=${API_KEY}`;
    return fetch(apiUrl).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
  });

  try {
    const results = await Promise.all(requests);
    // 결과를 하나의 배열로 합칩니다.
    const allData = results.flatMap((result) => result.data);
    return NextResponse.json({ currentCount: allData.length, data: allData });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.error();
  }
}