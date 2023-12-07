import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";

const Map = ({ address, name }) => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const container = document.getElementById("map");

    // Initialize Kakao Map
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // Default center for Seoul
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const newCoords = new window.kakao.maps.LatLng(
          result[0].y,
          result[0].x
        );
        setCoords(newCoords);

        map.setCenter(newCoords);

        const marker = new window.kakao.maps.Marker({
          position: newCoords,
        });
        marker.setMap(map);
      } else {
        console.error("Geocoding failed: " + status);
      }
    });
  }, [address]);
  return (
    <>
      <div id="map" className={styles.map}>
        <a
          className={styles.mapfind}
          href={
            coords
              ? `https://map.kakao.com/link/to/${name},${coords.Ma},${coords.La}`
              : "#"
          }
        >
          길찾기
        </a>
      </div>
    </>
  );
};

export default Map;
