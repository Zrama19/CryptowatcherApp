import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Featured.css';
import CoinOption from './CoinOption';

const Calculator = (props) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [currency, setCurrency] = useState();
  const [walletData, setWalletData] = useState();
  const [coinData, setCoinData] = useState();
  const [coinOption, setCoinOption] = useState();
  const [coin, setCoin] = useState();
  const walletAddress = props.wallet;
  const walletFixed = walletData?.toFixed(3);
  const [coinLoaded, setCoinLoaded] = useState(true);
  const [money, setMoney] = useState();
  const [coinsLoaded, setCoinsLoaded] = useState(true);

  const getCurrency = (e) => {
    setCurrency(e.target.value);
  };

  const getCoin = (e) => {
    setCoin(e.target.value);
  };

  const getMoney = (e) => {
    setMoney(e.target.value);
    e.preventDefault();
  };

  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1=&sparkline=false`;

    axios
      .get(url)
      .then((response) => {
        setCoinOption(response.data);
        setCoinsLoaded(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(coinOption);

  useEffect(() => {
    const urlWallet = `https://openapi.debank.com/v1/user/chain_balance?id=${walletAddress}&chain_id=eth`;

    axios
      .get(urlWallet)
      .then((response) => {
        setWalletData(response.data.usd_value);
        setIsLoaded(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [walletAddress]);
  //eslint-disable-next-line
  const getCoinApi = async () => {
    const coinUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    axios
      .get(coinUrl)
      .then((response) => {
        setCoinData(response.data[0].current_price);
        setCoinLoaded(false);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(coinUrl);
  };

  useEffect(() => {
    getCoinApi();
    //eslint-disable-next-line
  }, [money, coin, currency]);

  return (
    <div className='container'>
      <div className='connect-wallet'>
        {isLoaded ? (
          <h3>Connect your Wallet to view Balance</h3>
        ) : (
          <div>
            <h3>Current Wallet Balance: ${walletFixed}</h3>
            <div>
              <label>Choose a Currency: </label>
              <select name='currencies' onChange={getCurrency} required>
                <option value='null'>----</option>
                <option value='USD'>USD</option>
                <option value='RUB'>RUB</option>
                <option value='AED'>AED</option>
              </select>
              <div>
                <input type='number' value={money} onChange={getMoney}></input>
              </div>
            </div>
            <div>
              <label>Choose a coin:</label>
              {coinsLoaded ? null : (
                <select name='cryptos' onChange={getCoin}>
                  <option value='null'>----</option>
                  {coinOption.map((coinOption, index) => {
                    return <CoinOption coinOption={coinOption} key={index} />;
                  })}
                </select>
              )}
            </div>
            <div>
              {coinLoaded ? null : (
                <p>
                  You have{' '}
                  {(money / coinData)
                    ?.toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                  worth of {coin} based on {currency} currency.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
