// src/hooks/aptPrice/useAptPrice.js
import { useQuery } from "@tanstack/react-query";
import { REGION_CODES } from "@/app/api/estate/route";
import { XMLParser } from 'fast-xml-parser';

const fetchAptPriceData = async () => {
  const API_KEY = process.env.NEXT_PUBLIC_APT_PRICE_KEY;
  const parser = new XMLParser();

  const requests = REGION_CODES.map((regionCode) => {
    const apiUrl = `https://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev/getRTMSDataSvcAptTradeDev?serviceKey=${API_KEY}&LAWD_CD=${regionCode}&DEAL_YMD=201512&pageNo=1&numOfRows=10`;
    return fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // XML을 문자열로 받아옴
      })
      .then((xml) => {
        const jsonData = parser.parse(xml); // XML을 JSON으로 변환
        return jsonData.response.body.items.item; // 변환된 JSON에서 필요한 데이터 추출
      });
  });

  const results = await Promise.all(requests);
  const allData = results.flat(); // 모든 데이터를 하나로 합침
  return allData;
};

export default function useAptPrice() {
  return useQuery({
    queryKey: ['aptPriceData'],
    queryFn: fetchAptPriceData,
    staleTime: 1000 * 60 * 5, // 5분
    cacheTime: 1000 * 60 * 10, // 10분
    retry: 1, // 실패 시 한 번 재시도
  });
}
