import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
// import QRCodeComponent from './component/qr_code';
// import MapComponent from './component/Map';
// import { MapContainer, TileLayer } from 'react-leaflet'

import ShowPins from './component/ShowPins';
import './component/Map.css'

function Detail_top(props) {

    const [json, Setjson] = useState({})
    const [data, setData] = useState(null);
    const [position, setPosition] = useState([0,0]);

    const id = useParams()["id"];

    //初回のみ実行
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
    }, []);

    if (data!=null) {

        // console.log(data, "data");
        // console.log(position,"position");
        // console.log(id, "id");

        return (
            <>
                <ShowPins />

                {/* <div>
                    住所<br />
                    {data["location_address"]}
                </div>
                <div>
                    回収前の重さ<br />
                    {parseInt(data["amount"])}g
                </div>
                <div>
                    ゴミ箱の最大容量<br />
                    {parseInt(data["max_amount"])}g
                </div>
                <div>
                    報酬<br />
                    {parseInt(data["reward"])}slv
                </div>
                <div>
                    依頼主<br />
                    {data["owner"]}
                </div> */}

                {/* <MapComponent
                    position={position}
                    location_address={data["location_address"]}
                    amount={parseInt(data["amount"])}
                    max_amount={parseInt(data["max_amount"])}
                    reward={parseInt(data["reward"])}
                    owner={parseInt(data["owner"])}
                /> */}

                {/* <QRCodeComponent json={json} /> */}
                <br />
                <button type="button" className="btn btn-dark" onClick={() => { props.cont.sign(data.toString(), Setjson) }} >仕事を開始する</button>

            </>
        );
    } else {
        return (
            <>
            </>
        );
    }
}
export default Detail_top;
