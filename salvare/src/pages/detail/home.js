import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ShowPins from "./component/ShowPins";

function DetailTop(props) {


    return (
      <>
        <ShowPins cont={props.cont} />
        {/* <QRCodeComponent json={json} /> */}
      </>
    );
}
export default DetailTop;
