import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import PopupContent from './PopupContent';
import WorkingContent from './WorkingContent';

const ShowPins = (props) => {
  const [pins, setPins] = useState([]);
  const [mapCenter, ] = useState([35.657580, 139.701964]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active_pin,setActive_pin]=useState(null);

  const [id,setId]=useState(0);

  const handleMarkerClick = () => {
    setIsModalOpen(true);
  };

  // モーダルが閉じられた際のハンドラ
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //初回のみ実行

  useEffect(() => {
    const get_variable = async () => {
      if (await props.cont.isMetaMaskConnected()) {
        //値を取得
        const _data = await props.cont.getTrashCans();
        setPins(_data);
        const _data1=await props.cont.getIsWorking()
        setId(parseInt(_data1.id._hex));
      }
    };
    get_variable();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pins && id === 0) {
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
            position={[parseFloat(pin.trashCanLatitude._hex/100000000000000) ,parseFloat(pin.trashCanLongitude._hex/100000000000000)]}
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
        {isModalOpen && (<PopupContent pin={active_pin} cont={props.cont} setId={setId} isOpen={isModalOpen} closeModal={closeModal}/>)}
      </MapContainer>
    );
  }
  else {
    console.log(pins,id,pins[id]);

    return (
      <WorkingContent pin={pins[id]} setId={setId} setActive_pin={setActive_pin} closeModal={closeModal} cont={props.cont} />

    );
  };
}


  export default ShowPins;
