import React from 'react';
import './Hero.css';
import Crypto from '../assets/pogo.png';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Hero = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  const onSubmit = (data) => {
    console.log(data);

    navigate('/signup');
  };
  return (
    <div className='hero'>
      <div className='container'>
        {/* Left Side */}
        <div className='left'>
          <p>Buy & Sell Crypto 24/7 using your MetaMask Wallet</p>
          <h1>Keep up to date with real time prices</h1>
          <p>Buy, Sell, and store hundreds of Cryptocurrencies</p>
          <div className='input-container'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className='input-hero'
                type='email'
                placeholder='Enter your email'
                onSubmit={handleKeypress}
                required
              />

              <button type='submit' className='btn'>
                Learn More
              </button>
            </form>
          </div>
        </div>
        {/* Right Side */}
        <div className='right'>
          <div className='img-container'>
            <img src={Crypto} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
