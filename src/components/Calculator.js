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
  const [modalLoading, setModalLoading] = useState(true);
  const [accountLoading, setAccountLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const url = `https://api.coingecko.com/api/v3/coins/bitcoin`;

  const accountHandle = () => {
    if (window.ethereum) {
      setAccountLoading(false);
    } else {
      setAccountLoading(true);
    }
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
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <h1 className='crypto-h1'>Crypto Calculator.</h1>
            <p className='crypto-p'>
              Check real time rates for hundreds of cryptocurrencies, and
              convert between popular fiat currencies.
            </p>
          </div>
          <div>
            <div id='calculator'>
              <p>
                PogO fadkj adlkfjdlk ajflkdj alfdkfj aljdfk ds adsa dsa da fdfas
                da ad
              </p>

              <p onClick={getCoinApi}>Click Me!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
