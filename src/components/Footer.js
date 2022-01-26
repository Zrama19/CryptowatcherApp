import React from 'react';
import { FaInstagram, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <div id='footsies' className='footer'>
      <div className='container'>
        <div className='col'>
          <h5>Created by Zarif Ramazanov using React.js</h5>
          <span className='bar'> </span>
          <a
            href='https://www.instagram.com/zrama19'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaInstagram className='icon' />
          </a>
          <a
            href='https://twitter.com/zrama19'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaTwitter className='icon' />
          </a>
          <a
            href='https://www.linkedin.com/in/zarif-ramazanov-217a46156/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaLinkedin className='icon' />
          </a>
          <a
            href='https://github.com/zrama19'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaGithub className='icon' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
