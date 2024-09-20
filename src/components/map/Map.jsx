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
          level: 8,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        const clusterer = new window.kakao.maps.MarkerClusterer({
          map: map,
          averageCenter: true,
          minLevel: 8,
        });
        clustererRef.current = clusterer;

        // aptPriceData가 로드될 때 마커 생성
        if (aptPriceData && aptPriceData.length > 0) {
          createMarkers(aptPriceData, map);
        }
      });
    };

    const createMarkers = (aptData, map) => {
      const markers = [];

      // aptPriceData 배열을 순회하면서 lat, lng 값을 가져옵니다
      aptData.forEach(apt => {
        const { lat, lng, aptNm, dealAmount, excluUseAr, buildYear, floor, dealYear, dealMonth } = apt;

        // lat과 lng 값이 존재하는 경우에만 마커를 생성
        if (lat && lng) {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(lat, lng),
          });

          // 정보창에 표시할 내용 설정
          const infowindowContent = `
            <div id='aptInfo'>
              <strong>아파트명:</strong> ${aptNm}<br>
              <strong>거래 연, 월:</strong> ${dealYear}.${dealMonth}<br>
              <strong>거래 금액:</strong> ${dealAmount}만원<br>
              <strong>전용면적:</strong> ${excluUseAr}㎡<br>
              <strong>건축년도:</strong> ${buildYear}년<br>
              <strong>층수:</strong> ${floor}층<br>
            </div>
          `;

          const infowindow = new window.kakao.maps.InfoWindow({
            content: infowindowContent,
          });

          // 마커 클릭 이벤트 리스너
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
        }
      });

      // 클러스터러에 마커 추가
      clustererRef.current.addMarkers(markers);
      markersRef.current = markers;
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
  }, [aptPriceData]);

  useEffect(() => {
    if (mapRef.current && center) {
      const newCenter = new window.kakao.maps.LatLng(center.lat, center.lng);
      mapRef.current.setCenter(newCenter);
    }
  }, [center]);

  return (
    <>
      <section className="kakao__map">
        <div id="map"></div>
      </section>
    </>
  );
};

export default Map;
