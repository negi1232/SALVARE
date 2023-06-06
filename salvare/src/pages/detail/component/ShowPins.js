import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PopupContent from './PopupContent';
import TrashCanChart from './TrashCanChart';
import dummyData from './dummyData.json';

const ShowPins = ( props, data ) => {
  const [pins, setPins] = useState([]);
  const [, setJson] = useState({})

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
          position={[pin.trashCan_latitude, pin.trashCan_longitude]}
        >
          <Popup>
                  <PopupContent pin={pin} />
                  <TrashCanChart amount={pin.trashCan_amount} max_amount={pin.trashCan_max_amount} />
                  <button type="button" className="btn btn-dark" onClick={() => { props.cont.sign(data.toString(), setJson) }} >
                    仕事を開始する</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ShowPins;
