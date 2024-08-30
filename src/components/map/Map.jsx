"use client";

import { useEffect, useState, useRef } from "react";

const Map = () => {
  const [centerCoordinates, setCenterCoordinates] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState({});
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infowindowRef = useRef(null); // infoWindow 참조를 위한 useRef

  useEffect(() => {
    // API로부터 REGION_CODES와 CENTER_COORDINATE 데이터를 가져옵니다.
    const fetchCoordinates = async () => {
      try {
        const response = await fetch('/api/estate'); // API 경로를 올바르게 설정
        const data = await response.json();
        setCenterCoordinates(data.centerCoordinate); // 중심 좌표 데이터 설정
        setAdditionalInfo({
          areaData: data.areaData,
          countData: data.countData,
          areaResidenceData: data.residenceData,
          CountResidenceData: data.countResidenceData,
          areaBuildTypeData: data.areaBuildTypeData,
          countBuildTypeData: data.countBuildTypeData,
          areaDealerData: data.areaDealerData,
          countDealerData: data.countDealerData
          // 다른 필요 데이터 추가
        })
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
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);


        // ========== estate 데이터 뿌리기 ==========


        if (centerCoordinates) {
          const markers = [];
          Object.entries(centerCoordinates).forEach(([regionCode, coords]) => {
            coords.forEach(coord => {
              const [lat, lng] = coord.split(',').map(Number);
              const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(lat, lng),
                map: null, // 처음에는 보이지 않도록 설정
              });

              // 정보 추출
              const areaInfo = additionalInfo.areaData?.find(item => item.REGION_CD === regionCode) || {};
              const countInfo = additionalInfo.countData?.find(item => item.REGION_CD === regionCode) || {};
              const areaResidence = additionalInfo.countData?.find(item => item.REGION_CD === regionCode) || {};
              const countResidence = additionalInfo.countData?.find(item => item.REGION_CD === regionCode) || {};
              const areaBuildType = additionalInfo.countData?.find(item => item.REGION_CD === regionCode) || {};
              const countBuildType = additionalInfo.countData?.find(item => item.REGION_CD === regionCode) || {};
              const areaDealer = additionalInfo.countData?.find(item => item.REGION_CD === regionCode) || {};
              const countDealer = additionalInfo.countData?.find(item => item.REGION_CD === regionCode) || {};
              

              const infowindowContent = `
                <div id="estateInfo">
                  <strong>지역 코드:</strong> ${regionCode}<br>
                  <strong>위도:</strong> ${lat}<br>
                  <strong>경도:</strong> ${lng}<br>
                  <strong>거래 면적 조회:</strong> ${areaInfo.ALL_AREA || '정보 없음'}<br>
                  <strong>거래 건수 조회:</strong> ${countInfo.ALL_CNT || '정보 없음'}<br>
                  <strong>거래 건수 조회:</strong> ${countInfo.ALL_CNT || '정보 없음'}<br>
                  <strong>거래 건수 조회:</strong> ${countInfo.ALL_CNT || '정보 없음'}<br>
                  <strong>거래 건수 조회:</strong> ${countInfo.ALL_CNT || '정보 없음'}<br>
                  <strong>거래 건수 조회:</strong> ${countInfo.ALL_CNT || '정보 없음'}<br>
                  <strong>거래 건수 조회:</strong> ${countInfo.ALL_CNT || '정보 없음'}<br>
                  <strong>거래 건수 조회:</strong> ${countInfo.ALL_CNT || '정보 없음'}<br>
                </div>
              `;

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
              });

              markers.push(marker);
            });
          });

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


    // ========== estate 데이터 뿌리기 ==========


    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&autoload=false`;
    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
    document.head.appendChild(kakaoMapScript);

    return () => {
      document.head.removeChild(kakaoMapScript);
    };
  }, [centerCoordinates]);

  const adjustMarkerVisibility = (map) => {
    const level = map.getLevel();
    const markers = markersRef.current;

    markers.forEach(marker => {
      if (level >= 4) {
        marker.setMap(map); // 줌 레벨이 4 이상일 때 마커 보이기
      } else {
        marker.setMap(null); // 줌 레벨이 4 미만일 때 마커 숨기기
      }
    });
  };

  return (
    <section className="kakao__map">
      <div id="map"></div>
    </section>
  );
};

export default Map;
