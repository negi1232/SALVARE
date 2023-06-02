import { useState, useEffect, useRef } from 'react';

import QRCodeComponent from './component/qr_code';
function Detail_top(props) {


    const [json,Setjson] =useState({})
    const [message,setMessage]=useState("");
    //初回のみ実行
    useEffect(() => {
        console.log("useEffect");
        setMessage("仕事を開始します");
    }, []);
    return (
        <>


            <QRCodeComponent json={json} />
            <br/>
            <button type="button" class="btn btn-dark" onClick={() => { props.cont.sign(message,Setjson)}} >仕事を開始する</button>

        </>
    );
}
export default Detail_top;