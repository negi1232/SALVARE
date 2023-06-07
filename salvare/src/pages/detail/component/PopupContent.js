import React, { useEffect, useState } from 'react';
import TrashCanChart from './TrashCanChart';
import { Modal, Button } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import './PopupContent.css';
import QRCodeComponent from './qr_code';

import BestRoute from './BestRoute';
import L from 'leaflet';

const PopupContent = ({ pin, cont, setId, isOpen, closeModal }) => {

  const [json, setJson] = React.useState(null);
  const [value, setValue] = useState(0);

  const centerLocation = [(parseInt(pin.recyclingCenter.recyclingCenterLatitude._hex) + parseInt(pin.trashCanLatitude._hex )) /100000000000000/ 2,
    (parseInt(pin.recyclingCenter.recyclingCenterLongitude._hex) + parseInt(pin.trashCanLongitude._hex)) / 100000000000000 / 2]

  const trashCanLocation = [parseFloat(pin.trashCanLatitude._hex / 100000000000000),
    parseFloat(pin.trashCanLongitude._hex / 100000000000000)]

  const recyclingCenterLocation = [parseFloat(pin.recyclingCenter.recyclingCenterLatitude._hex / 100000000000000),
                parseFloat(pin.recyclingCenter.recyclingCenterLongitude._hex / 100000000000000)]

  useEffect(() => {
    if (value === 100) {

      //イベントリスナーを設定
      cont.event_start_work(parseInt(pin.id._hex),setId);
      cont.sign(pin.join(','), setJson);
    }
  }, [value, cont, pin, setId]);

    const manIcon = L.icon({
    iconUrl: "https://cdn.discordapp.com/attachments/1105178218748710952/1115840689968795760/emoji_people_FILL1_wght400_GRAD0_opsz48.png",
    iconSize: [41, 41],
    iconAnchor: [20, 11],
    popupAnchor: [0, -41],
  });

  const factoryIcon = L.icon({
    // iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconUrl: "https://cdn.discordapp.com/attachments/1105178218748710952/1115836138343649281/factory_FILL1_wght400_GRAD0_opsz48.png",
    iconSize: [60, 60],
    iconAnchor: [31, 41],
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

          <BestRoute
            initialLocation={centerLocation}
            trashCanLocation={trashCanLocation}
            recyclingCenterLocation={recyclingCenterLocation}
            manIcon={manIcon}
            factoryIcon={factoryIcon}
          />

          {!json ?

          <div className='row' style={{ "marginTop": "50px" }}>
            <div className='col-1' />
            <div className='col-10'>
              <label>仕事を開始する</label>

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
