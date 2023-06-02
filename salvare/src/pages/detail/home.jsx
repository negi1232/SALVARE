import { useState, useEffect, useRef } from 'react';

import QRCodeComponent from './component/qr_code';
function Detail_top(props) {
    const json = {
        public_address: '0x5fEAC388434a70169D56e3fc77988CBebb87c8a3',
        text: 'work_start',
        Signature:"0xa0a6258d1a4bcba3696e871516455786517e533578434e3676f3b817339842b3440ca93976fba34d7c3e94783db9089d6a46add2157b251cb85c643a4172be8f1b",
        v:27,
        r:"0xa0a6258d1a4bcba3696e871516455786517e533578434e3676f3b817339842b3",
        s:"0x440ca93976fba34d7c3e94783db9089d6a46add2157b251cb85c643a4172be8f"

      };
    return (
        <>
            detail
            <QRCodeComponent json={json} />

        </>
    );
}
export default Detail_top;