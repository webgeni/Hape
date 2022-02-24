import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Wallet from './artifacts/contracts/Wallet.sol/Wallet.json';
import logo from './images/logo.png';
import collection from './images/hape.gif'
import './App.css';


let WalletAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

function App() {

  
  const [amountSend] = useState('0.15');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  
  async function transfer() {
    if(!amountSend) {
      return;
    }

    setError('');
    setSuccess('');
    if(typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const tx = {
          from: accounts[0],
          to: WalletAddress,
          value: ethers.utils.parseEther(amountSend)
        }
        const transaction = await signer.sendTransaction(tx);
        await transaction.wait();
       
        setSuccess('Vous avez mint 1 HAPE! ')
      }
      catch(err) {
        setError('');
      }
    }
  }
  

  return (

    
    <div className="App">
 
      <div className="header">
          <img src={logo} alt="img" />
      </div>

      <div className="Tab">

      <table>
   <tr>
       <td>SUPPLY</td>
       <td>PRICE</td>
       <td>MAX</td>
   </tr>
   <tr>
       <td>777</td>
       <td>0.15 ETH</td>
       <td>5</td>
   </tr>
</table>

      </div>
       
      <div className="container">

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        
        <div className="wallet__flex">

          <div className="walletG">
            <h4><img src={collection} className="img" /></h4>
            <h3>Mint a HAPE</h3>
            <button onClick={transfer}>MINT</button>
            

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;