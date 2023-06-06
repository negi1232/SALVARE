import React, { useEffect, useState } from 'react';
import TrashCanChart from './TrashCanChart';
import { Modal, Button } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import './PopupContent.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import QRCodeComponent from './qr_code';
const PopupContent = ({ pin, cont, isOpen, closeModal }) => {
  const [json, setJson] = React.useState(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (value == 100) {
      cont.sign(pin.join(','), setJson);
    }
  }, [value]);

    return (


      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>モーダルのタイトル</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Location: {pin.trashCan_location_address}</h4>
          <p>Amount: {parseInt(pin["amount"]["_hex"])}グラム</p>
          <p>Max Amount: {parseInt(pin["max_amount"]["_hex"])}グラム</p>
          <p>Reward: {parseInt(pin["reward"]["_hex"])}cjpy</p>
          <p>Owner: {pin["owner"].slice(0, 10)}</p>

          <TrashCanChart amount={parseInt(pin["amount"])} max_amount={parseInt(pin["max_amount"])} />

          <p>Recycling Center: {pin["recycling_center"]["location_address"]}</p>
          <MapContainer
            center={[parseFloat(pin["lat"]["_hex"] / 100000000000000), parseFloat(pin["lot"]["_hex"] / 100000000000000)]}
            zoom={16}
            style={{ height: '50vh', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="Map data &copy; OpenStreetMap contributors"
            />

            <Marker
              key={1}
              position={[parseFloat(pin["lat"]["_hex"] / 100000000000000), parseFloat(pin["lot"]["_hex"] / 100000000000000)]}

            >



            </Marker>
          </MapContainer>

          {!json ?

          <div className='row' style={{ "marginTop": "50px" }}>
            <div className='col-1' />
            <div className='col-10'>
              <RangeSlider
                value={value}
                onChange={changeEvent => setValue(changeEvent.target.value)}
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
