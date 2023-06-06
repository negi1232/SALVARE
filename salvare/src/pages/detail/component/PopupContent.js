import React, { useEffect, useState } from 'react';
import TrashCanChart from './TrashCanChart';
import { Modal, Button } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import './PopupContent.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import QRCodeComponent from './qr_code';

import L from 'leaflet';

const PopupContent = ({ pin, rcPins, cont, isOpen, closeModal }) => {

  const [json, setJson] = React.useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (value === 100) {
      cont.sign(pin.join(','), setJson);
    }
  }, [ value, cont, pin ]);


  const customIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });


    
    return (
      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{pin.location_address}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Location Info:</h4>
          <p>Amount: {parseInt(pin.trashCanAmount._hex)}グラム</p>
          <p>Max Amount: {parseInt(pin.trashCanMaxAmount._hex)}グラム</p>
          <p>Reward: {parseInt(pin.trashCanReward._hex)}cjpy</p>
          <p>Owner: {pin.trashCanOwner.slice(0, 10)}</p>

          <TrashCanChart amount={parseInt(pin.trashCanAmount)} max_amount={parseInt(pin.trashCanMaxAmount)} />

          <p>Recycling Center: {pin.recyclingCenter.recyclingCenterName}</p>
          <MapContainer
            center={[(parseInt(pin.recyclingCenter.recyclingCenterLatitude._hex) + parseInt(pin.trashCanLatitude._hex )) /100000000000000/ 2,
            (parseInt(pin.recyclingCenter.recyclingCenterLongitude._hex) + parseInt(pin.trashCanLongitude._hex))/ 100000000000000/2]}
            zoom={16}
            style={{ height: '50vh', width: '100%' }}
            dragging={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="Map data &copy; OpenStreetMap contributors"
            />

            {/* trash can location from smart contract */}
            <Marker
              key={1}
              position={
                [parseFloat(pin.trashCanLatitude._hex / 100000000000000),
                 parseFloat(pin.trashCanLongitude._hex / 100000000000000)]}
            />
            
            {/* Recycling center location from dummy data*/}
            <Marker
              key={2}
              position={
                [parseFloat(pin.recyclingCenter.recyclingCenterLatitude._hex / 100000000000000),
                parseFloat(pin.recyclingCenter.recyclingCenterLongitude._hex / 100000000000000)]}
                icon={customIcon}
            />

          </MapContainer>

          {!json ?

          <div className='row' style={{ "marginTop": "50px" }}>
            <div className='col-1' />
            <div className='col-10'>
              <RangeSlider
                value={value}
                onChange={changeEvent => setValue(parseInt(changeEvent.target.value))}
                style={{
                  width: '100%',
                  backgroundColor: 'blue',
                  // その他のスタイルプロパティ
                }}
              />
            </div>
          </div>:

          <div className='row' style={{ "marginTop": "50px" }}>
            <div className='col-1' />
            <div className='col-10'>
            <QRCodeComponent json={json} />
            </div>
          </div>

          }

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    );


};

export default PopupContent;
