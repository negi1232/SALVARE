import React, { useState } from 'react'
import './Map.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import TrashCanChart from './TrashCanChart'

const MapComponent = ({
  position,
  location_address,
  amount,
  max_amount,
  reward,
  owner,
  cont,
  data
}) => {
  console.log(position)
  const [json, Setjson] = useState({})

  return (
    <MapContainer
      center={[position[0], position[1]]}
      zoom={25}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[position[0], position[1]]}>
        <Popup>
          <div>{location_address}</div>
          <div>回収前の重さ{amount}</div>
          <div>報酬{reward}</div>
          <div>依頼主{owner}</div>
          <div>
            写真
            <div>
              <img
                src="https://images.unsplash.com/photo-1683814379330-850b83821645?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80"
                width={'200px'}
                alt="in-front-of-hachko"
              />
            </div>
            <TrashCanChart amount={amount} max_amount={max_amount} />
            {/* <QRCodeComponent json={json} /> */}
            <br />
            <button
              type="button"
              class="btn btn-dark"
              onClick={() => {
                cont.sign(data.toString(), Setjson)
              }}
            >
              仕事を開始する
            </button>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapComponent
