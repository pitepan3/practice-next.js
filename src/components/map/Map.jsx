import { useEffect } from "react";

const Map = () => {
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

        // 여러 마커 추가
        const properties = [
          { lat: 33.450701, lng: 126.570667, info: '매물 1' },
        ];

        const markers = properties.map(property => {
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

          return marker;
        });

        // 지도 클릭 시 마커 이동 및 위도, 경도 표시
        const mapClickListener = (mouseEvent) => {
          const latlng = mouseEvent.latLng;

          // 마지막 마커의 위치를 클릭한 위치로 이동
          if (markers.length > 0) {
            markers[0].setPosition(latlng);
          }

          const message = `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`;
          const resultDiv = document.getElementById('clickLatlng');
          resultDiv.innerHTML = message;
        };

        window.kakao.maps.event.addListener(map, 'click', mapClickListener);
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, []);

  return (
    <section className="kakao__map">
      <div id="map"></div>
      <div id="clickLatlng"></div>
    </section>
  );
};

export default Map;
