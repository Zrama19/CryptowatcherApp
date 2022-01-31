import React from 'react';
import Zangu from '../assets/zangu.png';

const About = () => {
  return (
    <div>
      <div>
        <img src={Zangu} alt='Zarif' className='about-pic' />
        <h1 className='about-h1'>
          My name is Zarif Ramazanov, the creator of CryptoWatcher.
        </h1>
        <p className='about-p'>
          CryptoWatcher is a React.JS app designed to easily access the Crypto
          Currency marketplace, learn extensive information about the different
          coins, and even calculate prices using the CW Calculator.
        </p>
      </div>
    </div>
  );
};

export default About;
