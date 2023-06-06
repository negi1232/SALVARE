import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PopupContent from './PopupContent';
import TrashCanChart from './TrashCanChart';
import dummyData from './dummyData.json';

const ShowPins = () => {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    setPins(dummyData);
  }, []);

  return (
    <MapContainer
      center={[35.658580, 139.700464]}
      zoom={16}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; OpenStreetMap contributors"
      />

      {pins.map((pin) => (
        <Marker
          key={pin.id}
          position={[pin.latitude, pin.longitude]}
        >
          <Popup>
                  <PopupContent pin={pin} />
                  <TrashCanChart amount={pin.amount} max_amount={pin.max_amount} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ShowPins;
