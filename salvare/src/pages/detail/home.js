import ShowPins from "./component/ShowPins";
import React, { useEffect, useState } from 'react';
import PopupContent from "./component/PopupContent";
function DetailTop(props) {


  return (
    <>
      <ShowPins cont={props.cont} />
    </>
  );
}
export default DetailTop;
