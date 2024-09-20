// src/hooks/aptPrice/useAptPrice.js
import { useQuery } from "@tanstack/react-query";
import { REGION_CODES } from "@/app/api/estate/route";
import { XMLParser } from 'fast-xml-parser';
import { regionCodesAfter } from "@/data/regionCodesAfter";

const fetchAptPriceData = async () => {
  const API_KEY = process.env.NEXT_PUBLIC_APT_PRICE_KEY;
  const parser = new XMLParser();

  const requests = REGION_CODES.map((regionCode) => {
    const apiUrl = `https://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev/getRTMSDataSvcAptTradeDev?serviceKey=${API_KEY}&LAWD_CD=${regionCode}&DEAL_YMD=202408&pageNo=1&numOfRows=10`;
    return fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // XML을 문자열로 받아옴
      })
      .then((xml) => {
        const jsonData = parser.parse(xml); // XML을 JSON으로 변환
        
        // 응답 데이터가 예상대로 있는지 확인하고 처리
        if (jsonData?.response?.body?.items?.item) {
          return jsonData.response.body.items.item; // 변환된 JSON에서 필요한 데이터 추출
        } else {
          console.error("Unexpected API response structure:", jsonData);
          return []; // 예기치 않은 구조일 경우 빈 배열 반환
        }
      })
      .catch((error) => {
        console.error("Error parsing API response:", error);
        return []; // 에러가 발생한 경우 빈 배열 반환
      });
  });

  const results = await Promise.all(requests);
  const allData = results.flat(); // 모든 데이터를 하나로 합침

  // umdCd와 일치하는 regionCodesAfter의 lat, lng 추가
  const allDataWithCoordinates = allData.map((item) => {
    // umdCd와 일치하는 인덱스를 찾기
    const index = regionCodesAfter.regionCodes.indexOf(parseInt(item.umdCd, 10)); // umdCd를 숫자로 변환 후 검색
    if (index !== -1) { // 유효한 인덱스인 경우
      item.lat = regionCodesAfter.lat[index]; // 일치하는 인덱스의 lat 할당
      item.lng = regionCodesAfter.lng[index]; // 일치하는 인덱스의 lng 할당
    }
    
    return item;
  });

  return allDataWithCoordinates;
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
