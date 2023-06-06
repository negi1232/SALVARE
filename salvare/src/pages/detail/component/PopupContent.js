import React from 'react';

const PopupContent = ({ pin }) => {
  return (
    <div>
      <h4>Location: {pin.location_address}</h4>
      <p>Amount: {pin.amount}</p>
      <p>Max Amount: {pin.max_amount}</p>
      <p>Reward: {pin.reward}</p>
      <p>Owner: {pin.owner}</p>
      <p>Client: {pin.client}</p>
      <p>Client Longitude: {pin.client_longitude}</p>
      <p>Client Latitude: {pin.client_latitude}</p>
      <img src={pin.location_image} width={"200px"} alt="Location" />
    </div>
  );
};

export default PopupContent;
