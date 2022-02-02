import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';

const Coin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [coinData, setCoinData] = useState([]);

  const coin = location.pathname.slice(1, 100);
  console.log(coin);

  const handleCoin = () => {
    navigate('/coins/1');
  };

  const handleCalculator = () => {
    navigate('/calculator');
  };

  const url = `https://api.coingecko.com/api/v3/coins/${coin}`;
  console.log(url);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoinData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);

  console.log(coinData);

  return (
    <div className='coin-container'>
      <h1>{coinData.name}</h1>
      <img className='coin-img-size' src={coinData.image?.large} alt='/'></img>
      <h3>Current Price:</h3>
      <div className='coin-prices'>
        <p className='coin-each'>
          <span>USD: </span>
          {coinData?.market_data?.current_price?.usd}
        </p>
        <p className='coin-each'>
          <span>AED: </span>
          {coinData?.market_data?.current_price?.aed}
        </p>
        <p className='coin-each'>
          <span>RUB: </span>
          {coinData?.market_data?.current_price?.rub}
        </p>
        <p className='coin-each'>
          <span>CAD: </span>
          {coinData?.market_data?.current_price?.cad}
        </p>
        <p className='coin-each'>
          <span>ARS: </span>
          {coinData?.market_data?.current_price?.ars}
        </p>
        <p className='coin-each'>
          <span>AUD: </span>
          {coinData?.market_data?.current_price?.aud}
        </p>
        <p className='coin-each'>
          <span>EUR: </span>
          {coinData?.market_data?.current_price?.eur}
        </p>
      </div>
      <h3 className='market-cap'>
        The current market cap of {coinData.name} is $
        {coinData.market_data?.market_cap?.usd
          .toString()
          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </h3>
      <div className='coin-buttons'>
        <Button onClick={handleCoin}>Browse Coins</Button>
        <Button onClick={handleCalculator}>Calculate</Button>
      </div>
    </div>
  );
};

export default Coin;
