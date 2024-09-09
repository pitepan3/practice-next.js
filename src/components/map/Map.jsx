"use client";

import { useEffect, useState, useRef } from "react";
import useAptPrice from "@/hooks/aptPrice/useAptPrice";

const Map = ({ center, setInfoWindowContent }) => {
  const [centerCoordinates, setCenterCoordinates] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState({});
  const mapRef = useRef(null);
  const clustererRef = useRef(null);
  const markersRef = useRef([]);
  const infowindowRef = useRef(null);

  // useAptPrice
  const { data: aptPriceData, isLoading: aptLoading, error: aptError } = useAptPrice();

  useEffect(() => {
    if (aptError) {
      console.error('Error fetching apartment price data:', aptError);
    }
    if (aptLoading) {
      console.log('Loading apartment price data...');
    }
    if (aptPriceData) {
      console.log('Fetched apartment price data:', aptPriceData);
    }
  }, [aptError, aptLoading, aptPriceData]);
  // useAptPrice

  useEffect(() => {
    // API로부터 REGION_CODES와 CENTER_COORDINATE 데이터를 가져옵니다.
    const fetchCoordinates = async () => {
      try {
        const response = await fetch('/api/estate');
        const data = await response.json();

        setCenterCoordinates(data.centerCoordinate); // 중심 좌표 데이터 설정
        setAdditionalInfo({
          areaData: data.areaData,
          countData: data.countData,
          areaResidenceData: data.areaResidenceData,
          countResidenceData: data.countResidenceData,
          areaBuildTypeData: data.areaBuildTypeData,
          countBuildTypeData: data.countBuildTypeData,
          areaDealerData: data.areaDealerData,
          countDealerData: data.countDealerData,
        });
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates();
  }, []);

  useEffect(() => {
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.500335, 127.037596),
          level: 4,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // 클러스터러 생성
        const clusterer = new window.kakao.maps.MarkerClusterer({
          map: map,
          averageCenter: true,
          minLevel: 10,
        });
        clustererRef.current = clusterer;

        // ========== estate 데이터 뿌리기 ==========
        if (centerCoordinates) {
          const markers = [];
          Object.entries(centerCoordinates).forEach(([regionCode, coords]) => {
            coords.forEach(coord => {
              const [lat, lng] = coord.split(',').map(Number);
              const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(lat, lng),
              });

              // 정보 추출
              const areaInfo = additionalInfo.areaData?.find(item => item.REGION_CD === regionCode) || {};
              const countInfo = additionalInfo.countData?.find(item => item.REGION_CD === regionCode) || {};
              const areaResidenceInfo = additionalInfo.areaResidenceData?.find(item => item.REGION_CD === regionCode) || {};
              const countResidenceInfo = additionalInfo.countResidenceData?.find(item => item.REGION_CD === regionCode) || {};
              const areaBuildTypeInfo = additionalInfo.areaBuildTypeData?.find(item => item.REGION_CD === regionCode) || {};
              const countBuildTypeInfo = additionalInfo.countBuildTypeData?.find(item => item.REGION_CD === regionCode) || {};
              const areaDealerInfo = additionalInfo.areaDealerData?.find(item => item.REGION_CD === regionCode) || {};
              const countDealerInfo = additionalInfo.countDealerData?.find(item => item.REGION_CD === regionCode) || {};

              const infowindowContent = `
                <div id="estateInfo">
                  <strong>지역 코드:</strong> ${regionCode}: ${areaInfo.REGION_NM}<br>
                  <strong>위도:</strong> ${lat}<br>
                  <strong>경도:</strong> ${lng}<br>
                  <strong>거래 면적 조회:</strong> ${areaInfo.ALL_AREA || '정보 없음'}<br>
                  <strong>거래 건수 조회:</strong> ${countInfo.ALL_CNT || '정보 없음'}<br>
                  <strong>매입자거주지별 거래 면적 조회:</strong> ${areaResidenceInfo.ALL_AREA || '정보 없음'}<br>
                  <strong>매입자거주지별 거래 건수 조회:</strong> ${countResidenceInfo.ALL_CNT || '정보 없음'}<br>
                  <strong>건물유형별 거래 면적(합계 면적):</strong> ${areaBuildTypeInfo.ALL_AREA || '정보 없음'}<br>
                  <strong>건물유형별 거래 건수(합계 건수):</strong> ${countBuildTypeInfo.ALL_CNT || '정보 없음'}<br>
                  <strong>거래주체별 면적 조회(합계 면적):</strong> ${areaDealerInfo.ALL_AREA || '정보 없음'}<br>
                  <strong>거래주체별 건수 조회:</strong> ${countDealerInfo.ALL_CNT || '정보 없음'}<br>
                </div>
                `;
              // 건물유형별 거래 면적(주거용 소계 면적):</strong> ${areaBuildTypeInfo.LIVE_SUM_AREA || '정보 없음'}
              // 건물유형별 거래 면적(단독주택 면적):</strong> ${areaBuildTypeInfo.BULD_USE11_AREA || '정보 없음'}
              // 건물유형별 거래 면적(다가구주택 면적):</strong> ${areaBuildTypeInfo.BULD_USE12_AREA || '정보 없음'}
              // 건물유형별 거래 면적(다세대주택 면적):</strong> ${areaBuildTypeInfo.BULD_USE13_AREA || '정보 없음'}
              // 건물유형별 거래 면적(연립주택 면적):</strong> ${areaBuildTypeInfo.BULD_USE14_AREA || '정보 없음'}
              // 건물유형별 거래 면적(아파트 면적):</strong> ${areaBuildTypeInfo.BULD_USE15_AREA || '정보 없음'}

              const infowindow = new window.kakao.maps.InfoWindow({
                content: infowindowContent,
              });

              // 클릭 이벤트 핸들러
              window.kakao.maps.event.addListener(marker, 'click', () => {
                const currentInfowindow = infowindowRef.current;
                if (currentInfowindow && currentInfowindow !== infowindow) {
                  currentInfowindow.close();
                }
                if (currentInfowindow === infowindow) {
                  infowindow.close();
                  infowindowRef.current = null;
                } else {
                  infowindow.open(map, marker);
                  infowindowRef.current = infowindow;
                }

                // 클릭된 마커의 정보 업데이트
                setInfoWindowContent(infowindowContent);
              });

              markers.push(marker);
            });
          });

          clusterer.addMarkers(markers); // 클러스터러에 마커 추가
          markersRef.current = markers;

          // 줌 레벨 변경 시 마커 가시성 조절
          window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
            adjustMarkerVisibility(map);
          });

          // 초기 마커 가시성 조절
          adjustMarkerVisibility(map);
        }
      });
    };

    // Kakao Map SDK 로드
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&autoload=false&libraries=clusterer`;
    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
    document.head.appendChild(kakaoMapScript);

    return () => {
      document.head.removeChild(kakaoMapScript);
    };
  }, [centerCoordinates, additionalInfo, setInfoWindowContent]);

  // center prop이 변경될 때마다 지도 중심 이동
  useEffect(() => {
    if (mapRef.current && center) {
      const newCenter = new window.kakao.maps.LatLng(center.lat, center.lng);
      mapRef.current.setCenter(newCenter);
    }
  }, [center]);

  const adjustMarkerVisibility = (map) => {
    const level = map.getLevel();
    const markers = markersRef.current;

    markers.forEach(marker => {
      if (level >= 4 && level < 7) {
        marker.setMap(map); // 줌 레벨이 4~7일 때 마커 보이기
      } else {
        marker.setMap(null); // 그 외 레벨에서는 마커 숨기기
      }
    });
  };

  return (
    <>
      <section className="kakao__map">
        <div id="map"></div>
      </section>
    </>
  );
};

export default Map;