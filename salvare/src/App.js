import { useEffect, useState, useRef } from "react";
import { Contracts_MetaMask } from './contract/contracts';
function App() {

  const cont = new Contracts_MetaMask();

  const [is_connect, setIs_connect] = useState(true);
  const [chain_id, setChain_id] = useState(null);

  useEffect(() => {
    //非同期処理をUseEffect内で行う場合は、async/awaitを使用する
    const get_variable = async () => {
      setChain_id(await cont.get_chain_id());
      setIs_connect(await cont.isMetaMaskConnected());
    }

    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }

    get_variable();
  }, [])

  if(is_connect==false){
    cont.connectWallet();
  }
  else{
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button type="button" class="btn btn-dark" onClick={() => { cont.sign() }} >connect MetaMask</button>
        </header>
      </div>
    );
  }
}

export default App;
