import { useState, useEffect, useRef } from 'react';
import List_component from './component/list_component'

function List_top(props) {
    return (
        <>
        詳細
            <button type="button" class="btn btn-dark" onClick={() => { props.cont.sign() }} >connect MetaMask</button>

            <List_component title={"aaaa"} address={"渋谷の犬の前"}/> <br/>
            <List_component title={"bbbb"} address={"渋谷の犬の右"}/> <br/>
            <List_component title={"cccc"} address={"渋谷の犬の後ろ"}/> <br/>
            <List_component title={"dddd"} address={"渋谷の犬の左"}/> <br/>
            <List_component title={"eeee"} address={"渋谷の犬の上"}/> <br/>
            <List_component title={"ffff"} address={"渋谷の犬の下"}/> <br/>

        </>
    );
}
export default List_top;