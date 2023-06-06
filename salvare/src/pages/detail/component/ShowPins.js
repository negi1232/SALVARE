import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PopupContent from './PopupContent';
import TrashCanChart from './TrashCanChart';
import dummyData from './dummyData.json';

const ShowPins = (props) => {
  const [pins, setPins] = useState([]);
  const [data, setData] = useState(null);
  const [mapCenter, setMapCenter] = useState([35.658580, 139.700464]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active_pin,setActive_pin]=useState(null);

  const handleMarkerClick = () => {
    setIsModalOpen(true);
  };
  
  // モーダルが閉じられた際のハンドラ
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //初回のみ実行
  // fetch data from smart contract
  useEffect(() => {
    const get_variable = async () => {
      if (await props.cont.isMetaMaskConnected()) {
        const _data = await props.cont.get_garbage_cans();
        setPins(_data);
      }
    };
    console.log("useEffect");
    get_variable();
    console.log(mapCenter)
  }, []);

  if (pins) {
    return (
      <MapContainer
        center={mapCenter}
        zoom={16}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; OpenStreetMap contributors"
        />

        {pins.map((pin,index) => (
          <Marker
            key={index}
            position={[parseFloat(pin["lat"]["_hex"]/100000000000000) ,parseFloat(pin["lot"]["_hex"]/100000000000000)]}
            eventHandlers={{
              click: () => {
                handleMarkerClick();
                setActive_pin(pin);
                console.log(pin);
              },
            }}
          >
            
            
                
          </Marker>
        ))}
        {isModalOpen && (<PopupContent pin={active_pin} cont={props.cont} isOpen={isModalOpen} closeModal={closeModal}/>)}
      </MapContainer>
    );
  }
  else {
    return (
      <></>
    );
  };
}


  export default ShowPins;
