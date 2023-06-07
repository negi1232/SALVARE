import React, { useEffect, useState } from 'react';
import { MdBalance } from 'react-icons/md';
import ShowPins from "./component/ShowPins";
import "./home.css";

function DetailTop(props) {
  // fetched one's account balance
  const [balance,setBalance]=useState(0);
  const accountBlance = async () => {
    console.log( parseInt((await props.cont.fetchAccountBalance())._hex) );
    setBalance(parseInt((await props.cont.fetchAccountBalance())._hex));
  };
  accountBlance()
  

  return (
    <>

  
      <div>
        <ShowPins cont={props.cont} />
      </div>
      <div id="fixed-number">
        {balance/10**18}SALVARE
      </div>
    </>
  );
}
export default DetailTop;
