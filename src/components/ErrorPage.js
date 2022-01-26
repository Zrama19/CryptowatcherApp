import React from 'react';
import Zang from '../assets/zang.png';

const ErrorPage = () => {
  return (
    <div>
      <div>
        <img src={Zang} alt='' className='error' />
        <h1 className='error-h1'>Error 404...You're far from home</h1>
      </div>
    </div>
  );
};

export default ErrorPage;
