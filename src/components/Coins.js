import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cryptocard from './Cryptocard';
import './Coins.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Newdata from './Newdata';
import Button from '@mui/material/Button';

const Coins = (props) => {
  const [data, setData] = useState(null);
  const modalId = [];
  const [modalData, setModalData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coinPage, setCoinPage] = useState();
  const [leftButton, setLeftButton] = useState(false);
  const [rightButton, setRightButton] = useState(false);

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
  console.log(location);
  const stopForward = Number(location.pathname.slice(7, 100));
  console.log(stopForward);

  const navigate = useNavigate();

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
    if (stopForward <= 100 && stopForward > 0) {
      navigate(`/coins/${Number(pageIdSliced)}`);
    } else {
      navigate('/error');
    }
  }, [navigate, pageIdSliced, stopForward]);

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
    setCoinPage(data);
  };

  const goToCoin = () => {
    navigate(`/${coinPage}`);
  };

  console.log(coinPage);

  const handleBack = () => {
    if (stopForward > 1) {
      navigate(`/coins/${Number(pageIdSliced) - 1}`);
    } else {
      setLeftButton(true);
    }
  };

  const handleForward = () => {
    if (stopForward < 100) {
      navigate(`/coins/${Number(pageIdSliced) + 1}`);
    } else {
      setRightButton(true);
    }
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
        </div>
      </div>
      <div className='button-container'>
        <div className='left-button'>
          {leftButton ? null : <Button onClick={handleBack}>Back</Button>}
        </div>
        <div className='right-button'>
          {rightButton ? null : (
            <Button onClick={handleForward}>Forward</Button>
          )}
        </div>
      </div>

      <div>
        {isLoading ? null : (
          <Newdata
            handleNewdata={click}
            modalData={modalData}
            goToCoin={goToCoin}
          />
        )}
      </div>
    </div>
  );
};

export default Coins;
