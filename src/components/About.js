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
      </div>
    </div>
  );
};

export default About;
