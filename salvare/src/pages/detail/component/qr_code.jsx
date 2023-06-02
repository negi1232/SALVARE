import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = ({ json }) => {
  const jsonString = JSON.stringify(json);
    console.log(jsonString);
    console.log(json);
  return (
    <QRCode value={jsonString} />
  );
};

export default QRCodeComponent;