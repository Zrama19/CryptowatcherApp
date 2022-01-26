import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cryptocard from './Cryptocard';
import './Coins.css';
import { useLocation } from 'react-router-dom';
import CoinsPage from './CoinsPages';
import Newdata from './Newdata';

const Coins = (props) => {
  const [data, setData] = useState(null);
  const modalId = [];
  const [modalData, setModalData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const click = [];

  const modalApi = async () => {
    let url = `https://api.coingecko.com/api/v3/coins/${modalId}`;

    await axios
      .get(url)
      .then((response) => {
        setModalData(response.data);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const location = useLocation();

  const slicePage = location.pathname;
  const pageIdSliced = slicePage.slice(7, 100);
  props.function(pageIdSliced);

  const totalCoins = 1000;
  const coinsPerPage = 50;
  const coinPages = totalCoins / coinsPerPage;

  const coinsTotal = [];
  for (let i = 0; i < coinPages; i++) {
    coinsTotal.push(i + 1);
  }

  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPage}&page=${pageIdSliced}=&sparkline=false`;

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageIdSliced]);

  const handleModalClick = (data) => {
    modalId.push(data);
    modalApi();
    click.push(true);
    modalId.pop(data);
    click.pop(true);
  };

  if (!data) return null;

  return (
    <div>
      <div className='coins-featured'>
        <div className='container'>
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
          <div className='button-coins'></div>
        </div>
      </div>
      <div className='button-row'>
        <a
          className='button-numbers'
          href={`/coins/${Number(pageIdSliced) - 1}`}
        >
          Previous
        </a>
        {coinsTotal.map((page, index) => {
          return <CoinsPage page={page} key={index} />;
        })}

        <a
          className='button-numbers'
          href={`/coins/${Number(pageIdSliced) + 1}`}
        >
          Next
        </a>
      </div>
      <div>
        {isLoading ? null : (
          <Newdata handleNewdata={click} modalData={modalData} />
        )}
      </div>
    </div>
  );
};

export default Coins;
