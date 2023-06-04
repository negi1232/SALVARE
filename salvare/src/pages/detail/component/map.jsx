import React from 'react';
import "./map.css"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
const MapComponent = ({position}) => {
    
    console.log(position);
    return (
        <MapContainer center={[position[0],position[1]]} zoom={25} scrollWheelZoom={false} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position[0],position[1]]}>
        <Popup>
          A pretty CSS3 popup. <br/> Easily customizable.
        </Popup>
      </Marker>
      </MapContainer>
    )
};

export default MapComponent;