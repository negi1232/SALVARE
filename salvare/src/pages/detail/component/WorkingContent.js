import React, { useEffect, useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import './WorkingContent.css'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import QRCodeComponent from './qr_code';

import L from 'leaflet';

const WorkingContent = ({ pin,setId,setActive_pin,closeModal,cont }) => {

    const [value, setValue] = useState(0);
    const [json, setJson] = React.useState(null);


    useEffect(() => {
        if (value === 100) {
            cont.sign(pin.join(','), setJson);
            closeModal();
            setActive_pin(0);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [value]);
      useEffect(() => {
        cont.event_done_work(setId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const customIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -41],
    });

    return (
        <>
            <p>Recycling Center: </p>
            <p>{pin.recyclingCenter.recyclingCenterName}</p>
            <p>Address: </p>
            <p>{pin.recyclingCenter.recyclingCenterLocationAddress}</p>
            <MapContainer
                center={[(parseInt(pin.recyclingCenter.recyclingCenterLatitude._hex) + parseInt(pin.trashCanLatitude._hex)) / 100000000000000 / 2,
                (parseInt(pin.recyclingCenter.recyclingCenterLongitude._hex) + parseInt(pin.trashCanLongitude._hex)) / 100000000000000 / 2]}
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
                </div> :

                <div className='row' style={{ "marginTop": "50px" }}>
                    <div className='col-1' />
                    <div className='col-10'>
                        <QRCodeComponent json={json} />
                    </div>
                </div>

            }
        </>
    );
};

export default WorkingContent;
