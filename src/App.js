import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Coins from './components/Coins';
import ErrorPage from './components/ErrorPage';
import Signup from './components/Signup';
import Future from './components/Calculator';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import Footer from './components/Footer';
import ResponsiveAppBar from './components/Navbar';
import About from './components/About';

const getLibrary = (provider) => {
  return new Web3(provider);
};

const App = () => {
  const currentCoinPage = (path) => {};
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <ResponsiveAppBar />
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
            element={<Coins function={currentCoinPage} />}
          ></Route>

          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/calculator' element={<Future />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
      </Router>
      <Footer />
    </Web3ReactProvider>
  );
};

export default App;
