"use client"

import { useEffect } from "react";

const Map = ({ properties, center }) => {
  useEffect(() => {
    // 카카오 지도 스크립트 로드
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&autoload=false`;
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

        // center 좌표가 제공되면 지도를 해당 좌표로 이동
        if (center) {
          map.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng));
        }
      });
    };
    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  });

  return (
    <section className="kakao__map">
      <div id="map"></div>
    </section>
  );
};

export default Map;
