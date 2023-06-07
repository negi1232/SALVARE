import React, { useEffect, useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import './WorkingContent.css'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import QRCodeComponent from './qr_code';
import BestRoute from './BestRoute';
import L from 'leaflet';

const WorkingContent = ({ pin,setId,setActive_pin,closeModal,cont }) => {

    const [value, setValue] = useState(0);
    const [json, setJson] = React.useState(null);
    const centerLocation = [(parseInt(pin.recyclingCenter.recyclingCenterLatitude._hex) + parseInt(pin.trashCanLatitude._hex)) / 100000000000000 / 2,
    (parseInt(pin.recyclingCenter.recyclingCenterLongitude._hex) + parseInt(pin.trashCanLongitude._hex)) / 100000000000000 / 2]
    
    const trashCanLocation = [parseFloat(pin.trashCanLatitude._hex / 100000000000000),
  parseFloat(pin.trashCanLongitude._hex / 100000000000000)]
  const recyclingCenterLocation = [parseFloat(pin.recyclingCenter.recyclingCenterLatitude._hex / 100000000000000),
  parseFloat(pin.recyclingCenter.recyclingCenterLongitude._hex / 100000000000000)]

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

    useEffect(() => {
        if (value === 100) {
            cont.sign(pin.join(','), setJson);
            closeModal();
            setActive_pin(0);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [value]);
      useEffect(() => {
        cont.event_done_work(setId,parseInt(pin.id._hex));
    // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const customIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -41],
    });

    return (
        //margin-buttom: 500px;
        <>
        <div className='container'>
            <p>Recycling Center: </p>
            <p>{pin.recyclingCenter.recyclingCenterName}</p>
            <p>Address: </p>
            <p>{pin.recyclingCenter.recyclingCenterLocationAddress}</p>
           
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
                        <label>仕事を完了する</label>
                        <RangeSlider
                            tooltip={false}
                            value={value}
                            onChange={changeEvent => setValue(parseInt(changeEvent.target.value))}
                            style={{
                                width: '100%',
                                backgroundColor: 'blue',
                                // その他のスタイルプロパティ
                            }}
                        />
                    </div>
                </div> :

                <div className='row' style={{ "marginTop": "50px" }}>
                    <div className='col-1' />
                    <div className='col-10'>
                        <QRCodeComponent json={json} />
                    </div>
                </div>

            }
        </div>
        <div style={{height:"100px"}}></div>
        </>
    );
};

export default WorkingContent;
