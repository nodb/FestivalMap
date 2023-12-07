import React, { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울의 좌표
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

export default Map;
