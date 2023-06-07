import React from 'react';
import ShowPins from "./component/ShowPins";

function DetailTop(props) {
  // fetched one's account balance
  const accountBlance = async () => {
    console.log( parseInt((await props.cont.fetchAccountBalance())._hex) );
  };
  accountBlance()

  return (
    <>
      <ShowPins cont={props.cont}/>
    </>
  );
}
export default DetailTop;
