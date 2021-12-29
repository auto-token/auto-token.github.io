import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";

import './App.scss'
import Modal from 'react-modal'
import Nav from './components/Nav'
import ConnectWallet from './components/connectWallet'
import { isModalOpen } from './store/atom'
import { account_address, account_balance } from '../src/store/atom'
import { useRecoilState } from 'recoil';
import MainPage from './pages/mainPage'
import SecondPage from './pages/secondPage'

const App = () => {
  const [isOpen, setIsOpen] = useRecoilState(isModalOpen)

  return (
    <>
      <Nav />
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(!isOpen)} ariaHideApp={false}
        style={{
          overlay: {
            position: 'fixed',
            top: '0%',
            left: '0%',
            right: '0%',
            bottom: '0%',
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          },
          content: {
            top: '25%',
            left: '25%',
            right: '25%',
            bottom: '25%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }
        }}
      >
        <ConnectWallet />
      </Modal>
      <Switch>
        <Route component={MainPage} path="/" exact />
        <Route component={SecondPage} path="/second" exact />
      </Switch>
    </>

  )
};

export default App;
