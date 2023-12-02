import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../../images/marker-icon.png";

const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const GeolocationMap = () => {
  const [userLocation] = useState({ lat: 36.8065, lng: 10.1815 }); // Coordinates for Tunis

  return (
    <div>
      <h1 style={{ marginLeft: "580px" }}>GéoLocalisation</h1>
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={13}
        className="map-container"
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={customIcon}
        >
          <Popup>Votre position actuelle</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default GeolocationMap;
