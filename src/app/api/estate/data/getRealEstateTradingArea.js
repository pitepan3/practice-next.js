// 거래 면적 조회
import { REGION_CODES } from "./region_codes";

export default async function getRealEstateTradingArea() {
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
    const allData = results.flatMap((result) => result.data);
    return { data: allData }; // { data: allData } 형태로 반환
  } catch (error) {
    console.error('Error fetching data from getRealEstateTradingArea:', error.message);
    return { data: [] }; // 오류 발생 시 빈 데이터 반환
  }
}
