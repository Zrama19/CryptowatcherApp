import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='header'>
      <div className='container'>
        <a href='/'>
          <h1 className='cryptowatcher'>
            crypto<span className='primary'>watcher</span>
          </h1>
        </a>
        <ul>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/coins/1'>Coins</a>
          </li>

          <li>
            <a href='/#footsies'>Contact</a>
          </li>
          <li>
            <a href='/calculator'>Calculator</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
