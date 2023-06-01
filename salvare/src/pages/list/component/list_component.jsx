import { useState, useEffect, useRef } from 'react';


function List_component(props) {
    return (
        <>
        
            {props.title}<br/>
            {props.address}
        </>
    );
}
export default List_component;