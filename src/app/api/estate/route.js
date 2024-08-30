import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import getRealEstateTradingArea from './data/getRealEstateTradingArea';
import getRealEstateTradingCount from './data/getRealEstateTradingCount';
import getRealEstateTradingAreaResidence from './data/getRealEstateTradingAreaResidence';
import getRealEstateTradingCountResidence from './data/getRealEstateTradingCountResidence';
import getRealEstateTradingAreaBuildType from './data/getRealEstateTradingAreaBuildType';
import getRealEstateTradingCountBuildType from './data/getRealEstateTradingCountBuildType';
import getRealEstateTradingAreaDealer from './data/getRealEstateTradingAreaDealer';
import getRealEstateTradingCountDealer from './data/getRealEstateTradingCountDealer';

// REGION_CODES.txt 파일 경로 설정
const filePath = path.join(process.cwd(), 'REGION_CODES.txt');

// 파일 읽기
const fileContent = fs.readFileSync(filePath, 'utf-8');

// 각 줄에서 앞 5자리 코드와 중심 좌표 추출
const regionData = fileContent.split('\n').map(line => {
  const trimmedLine = line.trim();
  
  // 줄이 비어있지 않은 경우만 처리
  if (trimmedLine) {
    const code = trimmedLine.slice(0, 5); // 앞 5자리 법정동코드 추출
    const coords = trimmedLine.slice(trimmedLine.lastIndexOf('\t') + 1); // 중심 좌표 추출

    return { code, coords };
  }
}).filter(Boolean); // 빈 값 제거

// REGION_CODES 배열
const REGION_CODES = [...new Set(regionData.map(data => data.code))];

// 각 REGION_CODES와 일치하는 COORDINATES 배열
const CENTER_COORDINATE = regionData.reduce((acc, data) => {
  if (!acc[data.code]) {
    acc[data.code] = [];
  }
  acc[data.code].push(data.coords);
  return acc;
}, {});

// GET 요청에 대한 API 핸들러
export async function GET(request) {
  try {
    // 모든 데이터를 병렬로 가져오기
    const [
      areaData,
      countData,
      areaResidenceData,
      CountResidenceData,
      AreaBuildTypeData,
      CountBuildTypeData,
      AreaDealerData,
      CountDealerData,
    ] = await Promise.all([
      getRealEstateTradingArea(),
      getRealEstateTradingCount(),
      getRealEstateTradingAreaResidence(),
      getRealEstateTradingCountResidence(),
      getRealEstateTradingAreaBuildType(),
      getRealEstateTradingCountBuildType(),
      getRealEstateTradingAreaDealer(),
      getRealEstateTradingCountDealer(),
    ]);

    // 데이터 반환
    return NextResponse.json({
      regionCodes: REGION_CODES, // 법정동 코드 데이터
      centerCoordinate: CENTER_COORDINATE, // 중심 좌표 데이터
      areaData: areaData.data, // 부동산 관련 데이터
      countData: countData.data,
      areaResidenceData: areaResidenceData.data,
      CountResidenceData: CountResidenceData.data,
      AreaBuildTypeData: AreaBuildTypeData.data,
      CountBuildTypeData: CountBuildTypeData.data,
      AreaDealerData: AreaDealerData.data,
      CountDealerData: CountDealerData.data,
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return NextResponse.error();
  }
}

export { REGION_CODES, CENTER_COORDINATE };