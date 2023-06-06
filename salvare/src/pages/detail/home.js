import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import ShowPins from './component/ShowPins';

function DetailTop(props) {
    const [data, setData] = useState(null);
    const [, setPosition] = useState([0,0]);

    const id = useParams()["id"];

    //初回のみ実行
    // fetch data from smart contract
    useEffect(() => {
        const get_variable = async () => {

            if (await props.cont.isMetaMaskConnected()) {
                const _data = await props.cont.get_garbage_can(id)

                setData(_data);
                setPosition([  parseInt(_data["lat"]["_hex"]) / 100000000000000 ,parseInt(_data["lot"]) / 100000000000000]);
                // setPosition([ 30,30 ]);
            }
            //console.log([parseInt(data["lot"]) / 10000000000000, parseInt(data["lat"]) / 1000000000000000])
        }
        console.log("useEffect");
        get_variable();
    }, [ id, props.cont ]);

    if (data!=null) {

        return (
            <>
                <ShowPins props={props} data={data} />
                {/* <QRCodeComponent json={json} /> */}
            </>
        );
    } else {
        return (
            <>
            </>
        );
    }
}
export default DetailTop;
