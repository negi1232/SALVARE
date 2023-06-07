import React, { useState } from 'react';
import ShowPins from "./component/ShowPins";
import "./home.css";

function DetailTop(props) {
  // fetched one's account balance
  const [balance,setBalance]=useState(0);
  // props.cont.event_transfer(setBalance);
  const accountBlance = async () => {
    console.log( parseInt((await props.cont.fetchAccountBalance())._hex) );
    setBalance(parseInt((await props.cont.fetchAccountBalance())._hex));
    
  };
  useEffect(() => {

    accountBlance();
    setBalance(props.cont.event_transfer());
  }, [])
  
  return (
    <>


      <div>
        <ShowPins cont={props.cont} />
      </div>
      <div id="fixed-number">
        {parseInt(balance/10**18)}SALVARE
      </div>
    </>
  );
}
export default DetailTop;
