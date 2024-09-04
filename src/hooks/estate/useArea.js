// 거래 면적 조회
import { useQuery } from "@tanstack/react-query";
import { REGION_CODES } from "@/app/api/estate/route";

const fetchAreaData = async () => {
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

  const results = await Promise.all(requests);
  const allData = results.flatMap((result) => result.data);
  return allData;
};

export default function useArea() {
  return useQuery('areaData', fetchAreaData, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    retry: 1, // Retry once on failure
  });
}
