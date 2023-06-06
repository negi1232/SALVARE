import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = ({ json }) => {
  const jsonString = JSON.stringify(json);
    console.log(jsonString);
    console.log(json);
  return (
    <QRCode style={{width:"100%",height:"auto"}} value={jsonString} />
  );
};

export default QRCodeComponent;