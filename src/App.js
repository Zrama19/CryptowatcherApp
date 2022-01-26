import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Coins from './components/Coins';
import ErrorPage from './components/ErrorPage';
import Signup from './components/Signup';
import Future from './components/Calculator';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const getLibrary = (provider) => {
  return new Web3(provider);
};

const App = () => {
  const [wallet, setWallet] = useState();
  // console.log(wallet);

  const currentCoinPage = (path) => {};
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Navbar setWallet={setWallet} />
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <div>
                <Landing />
              </div>
            }
          ></Route>

          <Route
            path='/coins/:path'
            element={<Coins function={currentCoinPage} wallet={wallet} />}
          ></Route>

          <Route path='/signup' element={<Signup />}></Route>
          <Route
            path='/calculator'
            element={<Future wallet={wallet} />}
          ></Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
      </Router>
      <Footer />
    </Web3ReactProvider>
  );
};

export default App;
