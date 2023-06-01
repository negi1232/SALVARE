import { useEffect, useState, useRef } from "react";
import { Contracts_MetaMask } from './contract/contracts';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List_top from "./pages/detail/home";
import Detail_top from "./pages/list/home";
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
       <body>
         <div >
           <BrowserRouter basename={process.env.PUBLIC_URL}>
             {/* <Routes>
               <Route path={'/login'} element={<Login url={'login'} cont={cont}/>}  />
             </Routes> */}
             <Routes>
               <Route path={'/list'} element={<List_top url={'user_page'} cont={cont}/>}  />
             </Routes>
             <Routes>
               <Route path={'/detail/:id'} element={<Detail_top url={'create_quiz'} cont={cont}/>}  />
             </Routes>
             
           </BrowserRouter>
         </div>
         <div>
           {/* <Nav_menu cont={cont} /> */}
         </div>

       </body>
    );
  }
}

export default App;
