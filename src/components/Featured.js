import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Featured.css';
import Cryptocard from '../components/Cryptocard';
import { useNavigate } from 'react-router-dom';

const Featured = () => {
  const [data, setData] = useState([]);

  let pageId = 1;

  const getData = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page${pageId}=&sparkline=false`;
    await axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/coins/1');
  };

  const handleModalClick = () => {
    return null;
  };

  if (!data) return null;

  return (
    <div className='featured'>
      <div className='container'>
        {/* Left */}
        <div className='left'>
          <h2>Explore top Crypto's Like Bitcoin, Ethereum, and Dogecoin</h2>
          <p>See all available assets: Cryptocurrencies and NFT's</p>
          <button onClick={handleClick} className='btn'>
            See More Coins
          </button>
        </div>

        {/* Right */}

        <div className='right'>
          {data.map((data, index) => {
            return (
              <Cryptocard
                handleModalClick={handleModalClick}
                data={data}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Featured;
