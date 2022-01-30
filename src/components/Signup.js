import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Envelope from '../assets/envelope.png';

const Signup = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h1 className='signup-h1'>Thanks for signing up!</h1>
      <div className='signup'>
        <div className='left-signup'>
          <h3 className='left-h3'>
            You should receive the e-mail shortly. Make sure to check your spam
            folder, and we'll keep you up to date with all relevant crypto
            information!
          </h3>
          <Button onClick={handleHome} variant='contained'>
            Thanks!
          </Button>
        </div>
        <div className='right-signup'>
          <img className='mail-signup' src={Envelope} alt='mail'></img>
        </div>
      </div>
    </div>
  );
};

export default Signup;
