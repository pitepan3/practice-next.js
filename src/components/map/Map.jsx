"use client"

import { useEffect } from "react";

const Map = ({ properties }) => {
  useEffect(() => {
    // 카카오 지도 스크립트 로드
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 지도 타입 컨트롤 생성
        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        // 줌 컨트롤 생성
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // 마커 관리
        const markers = [];

        // 기존 마커 제거
        if (window.currentMarkers) {
          window.currentMarkers.forEach(marker => marker.setMap(null));
        }

        // 새로운 마커 추가
        properties.forEach(property => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(property.lat, property.lng),
            map: map,
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${property.info}</div>`,
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.open(map, marker);
          });

          markers.push(marker);
        });

        // 현재 마커 목록을 window 객체에 저장
        window.currentMarkers = markers;
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);

    // Cleanup function to remove script and markers when component unmounts
    return () => {
      kakaoMapScript.removeEventListener('load', onLoadKakaoAPI);
      if (window.currentMarkers) {
        window.currentMarkers.forEach(marker => marker.setMap(null));
      }
    };
  }, [properties]);

  return (
    <section className="kakao__map">
      <div id="map"></div>
    </section>
  );
};

export default Map;
