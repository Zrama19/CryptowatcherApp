import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import './Featured.css';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './Calculator.css';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import CoinOption from './CoinOption';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const btnStyle = {
  mt: 2,
};

const Calculator = (props) => {
  const [account, setAccount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState('usd');
  const [money, setMoney] = useState(1);
  const [modalLoading, setModalLoading] = useState(true);
  const [accountLoading, setAccountLoading] = useState(true);
  const [chosenLoading, setChosenLoading] = useState(true);
  const [coinData, setCoinData] = useState([]);
  const [coinOption, setCoinOption] = useState();
  const [open, setOpen] = useState(false);
  const [coin, setCoin] = useState('bitcoin');
  const [chosenData, setChosenData] = useState([]);
  const [disclaimerLoading, setDisclaimerLoading] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const url = `https://api.coingecko.com/api/v3/coins/bitcoin`;

  const [coinLoading, setCoinLoading] = useState(true);

  const accountHandle = () => {
    if (window.ethereum) {
      setAccountLoading(false);
    } else {
      setAccountLoading(true);
    }
  };

  const handleDisclaimer = () => {
    setDisclaimerLoading(false);
    handleOpen();
  };

  const getCoin = (e) => {
    setCoin(e.target.value);
  };
  const getCurrency = (e) => {
    setCurrency(e.target.value.toLowerCase());
  };

  const getMoney = (e) => {
    setMoney(e.target.value);
  };

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER'))
        await connectPrompt();
    })();
    //eslint-disable-next-line
  }, []);

  async function connectPrompt() {
    if (window.ethereum) {
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const firstAccount = await web3.eth.getAccounts().then((data) => data[0]);
      setAccount(firstAccount);
      setIsLoading(false);
    } else {
      setModalLoading(false);
    }
  }

  async function disconnect() {
    await web3Modal.clearCachedProvider();
    setAccount('');
    setIsLoading(true);
  }

  const providerOptions = {};
  const web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    providerOptions, // required
  });

  const getCoinApi = async () => {
    await axios
      .get(url)
      .then((response) => {
        setCoinData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getChosenApi = async () => {
    const url2 = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

    await axios
      .get(url2)
      .then((response) => {
        setChosenData(response.data);
        setChosenLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getChosenApi();
    // eslint-disable-next-line
  }, [coin, currency]);

  useEffect(() => {
    getCoinApi();
    // eslint-disable-next-line
  }, [url]);

  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1=&sparkline=false`;

    axios
      .get(url)
      .then((response) => {
        setCoinOption(response.data);
        setCoinLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='calculator'>
      <div className='metamask'>
        {isLoading ? (
          <Button
            sx={btnStyle}
            variant='contained'
            onClick={() => {
              connectPrompt();
              handleOpen();
              accountHandle();
            }}
          >
            Connect Wallet
          </Button>
        ) : (
          <Button
            sx={btnStyle}
            variant='contained'
            onClick={() => {
              disconnect();
              setAccountLoading(true);
            }}
          >
            Disconnect Wallet
          </Button>
        )}
      </div>
      <div>
        {modalLoading ? null : (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                If you are seeing this error, you need to install the Metamask
                Wallet extension.
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                <a
                  href='https://metamask.io/download/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Metamask Download
                </a>
              </Typography>
              <Button onClick={handleClose}>Got it!</Button>
            </Box>
          </Modal>
        )}
      </div>
      {disclaimerLoading ? null : (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                The rates displayed by the calculator represent market exchange
                rates, and are provided for informational and estimation
                purposes only. The calculator may allow you to calculate
                exchange rates of currencies currently not available for
                trading. The calculator is based on a third party service API,
                and may not be completely accurate.
              </Typography>

              <Button onClick={handleClose}>Got it!</Button>
            </Box>
          </Modal>
        </div>
      )}
      <div>
        {accountLoading ? null : (
          <p className='wallet-account'>
            You are currently connected with Wallet Address:{' '}
            <strong>{account}</strong>{' '}
          </p>
        )}
      </div>
      <div>
        <div className='content-flex'>
          <div className='calc-left'>
            <h1 className='crypto-h1'>Crypto Calculator</h1>
            <p className='crypto-p'>
              Check real time rates for hundreds of cryptocurrencies, and
              convert between popular fiat currencies.
            </p>
          </div>
          <div>
            {coinLoading ? (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            ) : (
              <div id='calculator'>
                <h3>How the crypto calculator works:</h3>
                <p className='crypto-p'>
                  Cryptowatcher's crypto calculator does the math so you don't
                  have to, giving real rates in real time. Convert fiat to
                  crypto in the blink of an eye. Try it out yourself!
                </p>
                <div id='oneBTC'>
                  1<span>{coinData.symbol?.toUpperCase()}</span>
                  <span id='oneBTC_seperator'>=</span>
                  {coinData?.market_data?.current_price?.usd}
                  <span>USD</span>
                </div>
                <div className='inputBox'>
                  <div>
                    <p className='calc-p'>
                      Choose an amount, the Coin, and your Fiat of choice.
                    </p>
                    <input
                      type='number'
                      min='0'
                      max='99999999'
                      defaultValue='1'
                      onChange={getMoney}
                    ></input>

                    <select name='cryptos' onChange={getCoin}>
                      {coinOption.map((coinOption, index) => {
                        return (
                          <CoinOption coinOption={coinOption} key={index} />
                        );
                      })}
                    </select>
                    <select name='currencies' onChange={getCurrency} required>
                      <option value='USD'>USD</option>
                      <option value='RUB'>RUB</option>
                      <option value='AED'>AED</option>
                    </select>
                  </div>
                </div>
                <div className='inputBox'>
                  <div>
                    {chosenLoading ? null : (
                      <div id='oneBTC'>
                        {money}
                        <span>{chosenData[0]?.name}</span>
                        <span id='oneBTC_seperator'>=</span>
                        {money * chosenData[0]?.current_price}
                        <span>{currency}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className='disclaimer'>
                  <Button onClick={handleDisclaimer}>Disclaimer</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
