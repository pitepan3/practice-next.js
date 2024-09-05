import { NextResponse } from 'next/server';

import { regionBusan } from '@/data/regionBusan'
import { regionChungBuk } from '@/data/regionChungBuk'
import { regionChungNam } from '@/data/regionChungNam'
import { regionDaejeon } from '@/data/regionDaejeon'
import { regionGangwon } from '@/data/regionGangwon'
import { regionGwangju } from '@/data/regionGwangju'
import { regionGyeongBuk } from '@/data/regionGyeongBuk'
import { regionGyeonggi } from '@/data/regionGyeonggi'
import { regionGyeongNam } from '@/data/regionGyeongNam'
import { regionIncheon } from '@/data/regionIncheon'
import { regionDaegu } from '@/data/regionDaegu'
import { regionJeonBuk } from '@/data/regionJeonBuk'
import { regionJeonNam } from '@/data/regionJeonNam'
import { regionSejong } from '@/data/regionSejong'
import { regionSeoul } from '@/data/regionSeoul'
import { regionUlsan } from '@/data/regionUlsan'
import { regionJeju } from '@/data/regionJeju'

const allRegions = [
  ...regionBusan,
  ...regionChungBuk,
  ...regionChungNam,
  ...regionDaejeon,
  ...regionGangwon,
  ...regionGwangju,
  ...regionGyeongBuk,
  ...regionGyeonggi,
  ...regionGyeongNam,
  ...regionIncheon,
  ...regionDaegu,
  ...regionJeonBuk,
  ...regionJeonNam,
  ...regionSejong,
  ...regionSeoul,
  ...regionUlsan,
  ...regionJeju,
];

// REGION_CODES와 CENTER_COORDINATE 배열 설정하기
const REGION_CODES = [...new Set(allRegions.map(region => region.region.toString()))];

const CENTER_COORDINATE = allRegions.reduce((acc, region) => {
  if (!acc[region.region]) {
    acc[region.region] = [];
  }
  acc[region.region].push(region.center);
  return acc;
}, {});

// API 호출 URL을 생성하는 함수
const createApiUrl = (endpoint, regionCode, apiKey) => {
  return `https://api.odcloud.kr/api/RealEstateTradingSvc/v1/${endpoint}?page=1&perPage=10&cond[RESEARCH_DATE::LTE]=202112&cond[RESEARCH_DATE::GTE]=202101&cond[REGION_CD::EQ]=${regionCode}&cond[DEAL_OBJ::EQ]=01&serviceKey=${apiKey}`;
};

// 데이터 패칭 함수 정의
const fetchFromAPI = async (apiUrl) => {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

// GET 요청에 대한 API 핸들러
export async function GET() {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_PUBLIC_RENTAL_HOUSE_KEY;

    // 각 API 호출 URL 정의
    const endpoints = {
      areaData: 'getRealEstateTradingArea',
      areaBuildTypeData: 'getRealEstateTradingAreaBuildType',
      areaDealerData: 'getRealEstateTradingAreaDealer',
      areaResidenceData: 'getRealEstateTradingAreaResidence',
      countData: 'getRealEstateTradingCount',
      countBuildTypeData: 'getRealEstateTradingCountBuildType',
      countDealerData: 'getRealEstateTradingCountDealer',
      countResidenceData: 'getRealEstateTradingCountResidence',
    };

    // 각 API 호출 URL 생성
    const fetchPromises = Object.entries(endpoints).reduce((acc, [key, endpoint]) => {
      acc[key] = Promise.all(
        REGION_CODES.map(regionCode => fetchFromAPI(createApiUrl(endpoint, regionCode, API_KEY)))
      );
      return acc;
    }, {});

    // 데이터 패칭
    const [
      areaDataResults,
      countDataResults,
      areaResidenceDataResults,
      countResidenceDataResults,
      areaBuildTypeDataResults,
      countBuildTypeDataResults,
      areaDealerDataResults,
      countDealerDataResults,
    ] = await Promise.all([
      fetchPromises.areaData,
      fetchPromises.countData,
      fetchPromises.areaResidenceData,
      fetchPromises.countResidenceData,
      fetchPromises.areaBuildTypeData,
      fetchPromises.countBuildTypeData,
      fetchPromises.areaDealerData,
      fetchPromises.countDealerData,
    ]);

    // 결과 배열 평탄화
    const allAreaData = areaDataResults.flatMap(result => result.data);
    const allCountData = countDataResults.flatMap(result => result.data);
    const allAreaResidenceData = areaResidenceDataResults.flatMap(result => result.data);
    const allCountResidenceData = countResidenceDataResults.flatMap(result => result.data);
    const allAreaBuildTypeData = areaBuildTypeDataResults.flatMap(result => result.data);
    const allCountBuildTypeData = countBuildTypeDataResults.flatMap(result => result.data);
    const allAreaDealerData = areaDealerDataResults.flatMap(result => result.data);
    const allCountDealerData = countDealerDataResults.flatMap(result => result.data);

    return NextResponse.json({
      regionCodes: REGION_CODES,
      centerCoordinate: CENTER_COORDINATE,
      areaData: allAreaData,
      countData: allCountData,
      areaResidenceData: allAreaResidenceData,
      countResidenceData: allCountResidenceData,
      areaBuildTypeData: allAreaBuildTypeData,
      countBuildTypeData: allCountBuildTypeData,
      areaDealerData: allAreaDealerData,
      countDealerData: allCountDealerData,
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return NextResponse.error();
  }
}

export { REGION_CODES, CENTER_COORDINATE };
