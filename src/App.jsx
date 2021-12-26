import React,{useState,useEffect} from 'react';
import caver from './libs/caver'
import './App.scss'
import networks from './constants/network';
import Nav from './components/Nav'
import WalletInfo from './components/WalletInfo';

const App = () => {

  
  const [accout,setAccount]=useState('')
  const [balance,setBalance]=useState('')
  const [network,setNetwork]=useState('')
  const [isVisible,setIsVisible]=useState('')

  useEffect(()=>{
    loadAccountInfo()
  })

  const loadAccountInfo = async () => {
    const { klaytn } = window
    if (klaytn) {
      try {
        await klaytn.enable()
        setAccountInfo(klaytn)
        setNetworkInfo(klaytn)
        klaytn.on('accountsChanged', () => setAccountInfo(klaytn))
      } catch (error) {
        console.log('User denied account access')
      }
    } else {
      console.log('Non-Kaikas browser detected. You should consider trying Kaikas!')
    }
  }

  const setAccountInfo = async () => {
    const { klaytn } = window
    if (klaytn === undefined) return

    const account = klaytn.selectedAddress
    const balance = await caver.klay.getBalance(account)
    setNetworkInfo(klaytn)
    setAccount(account)
    setBalance(balance)
  }

  const setNetworkInfo = () => {
    const { klaytn } = window
    if (klaytn === undefined) return

    setNetwork(klaytn.networkVersion)
    klaytn.on('networkChanged', () => setNetworkInfo(klaytn.networkVersion))
  }

  console.log(klaytn.networkVersion)

  return(
    <div className="App">
      <Nav network={network}/>
      <WalletInfo address={accout} balance={balance} />  
    </div>
    
  ) 
};

export default App;
