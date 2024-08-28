import { NextResponse } from 'next/server';
import getRealEstateTradingArea from './getRealEstateTradingArea';
import getRealEstateTradingCount from './getRealEstateTradingCount';
import getRealEstateTradingAreaResidence from './getRealEstateTradingAreaResidence';
import getRealEstateTradingCountResidence from './getRealEstateTradingCountResidence';
import getRealEstateTradingAreaBuildType from './getRealEstateTradingAreaBuildType';
import getRealEstateTradingCountBuildType from './getRealEstateTradingCountBuildType';
import getRealEstateTradingAreaDealer from './getRealEstateTradingAreaDealer';
import getRealEstateTradingCountDealer from './getRealEstateTradingCountDealer';
// 필요한 추가 API 호출 파일들을 import

export async function GET(request) {
  try {
    const [areaData, countData, areaResidenceData, CountResidenceData, AreaBuildTypeData, CountBuildTypeData, AreaDealerData, CountDealerData] = await Promise.all([
      getRealEstateTradingArea(),
      getRealEstateTradingCount(),
      getRealEstateTradingAreaResidence(),
      getRealEstateTradingCountResidence(),
      getRealEstateTradingAreaBuildType(),
      getRealEstateTradingCountBuildType(),
      getRealEstateTradingAreaDealer(),
      getRealEstateTradingCountDealer(),
    ]);

    return NextResponse.json({
      areaData: areaData.data, // { data: ... } 형태로 반환된 데이터를 사용
      countData: countData.data, // { data: ... } 형태로 반환된 데이터를 사용
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