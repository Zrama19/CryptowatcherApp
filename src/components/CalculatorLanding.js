import React from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';
import Calculator from '../assets/calculator.png';

const CalculatorLanding = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/calculator');
  };
  return (
    <div className='hero'>
      <div className='container'>
        {/* Left Side */}
        <div className='left'>
          <p>
            Calculate coin prices using the{' '}
            <strong>
              crypto<span className='primary'>watcher</span>
            </strong>{' '}
            calculator. Major fiat conversions and a large variety of top crypto
            currencies available for conversion on our app.
          </p>
          <button onClick={handleSubmit} className='btn'>
            Try it out!
          </button>
        </div>
        {/* Right Side */}
        <div className='right'>
          <div className='img-container'>
            <img src={Calculator} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorLanding;
