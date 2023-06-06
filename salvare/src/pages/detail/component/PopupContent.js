import React from 'react';

const PopupContent = ({ pin }) => {
  return (
    <div>
      <h4>Location: {pin.trashCan_location_address}</h4>
      <p>Amount: {pin.trashCan_amount}</p>
      <p>Max Amount: {pin.trashCan_max_amount}</p>
      <p>Reward: {pin.trashCan_reward}</p>
      <p>Owner: {pin.trashCan_owner}</p>
      <p>Recycling Center: {pin.recyclingCenter}</p>
      <p>Recycling Center Longitude: {pin.recyclingCenter_longitude}</p>
      <p>Recycling Center Latitude: {pin.recyclingCenter_latitude}</p>
      <img src={pin.trashCan_location_image} width={"200px"} alt="Location" />
    </div>
  );
};

export default PopupContent;
