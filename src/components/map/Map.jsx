"use client"
import React, { useEffect, useState } from 'react';

const Map = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [map, setMap] = useState(null);  // 맵 객체를 상태로 관리
  const [markers, setMarkers] = useState([]);  // 마커를 상태로 관리

  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=1bbb5e8ed53d349d0ca4ba70a05cf619&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const kakaoMap = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(kakaoMap); // 맵 객체 저장
      });
    };

    mapScript.addEventListener('load', onLoadKakaoMap);
  }, []);

  useEffect(() => {
    if (map) {
      // 기존 마커 제거
      markers.forEach(marker => marker.setMap(null));

      // 매물 데이터
      const properties = [
        { lat: 33.450701, lng: 126.570667, info: '매물 1' },
        { lat: 33.451701, lng: 126.571667, info: '매물 2' },
      ];

      const filteredProperties = properties.filter(property =>
        property.info.includes(searchTerm)
      );

      const newMarkers = filteredProperties.map(property => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(property.lat, property.lng),
          map: map,
        });

        window.kakao.maps.event.addListener(marker, 'click', function () {
          alert(property.info);
        });

        return marker;
      });

      setMarkers(newMarkers); // 새 마커 저장
    }
  }, [map, searchTerm]);

  return (
    <div className='kakao__map'>
      <input
        className='kakao__map__input'
        type="text"
        placeholder="검색어 입력"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div id="map"></div>
    </div>
  );
}

export default Map;
