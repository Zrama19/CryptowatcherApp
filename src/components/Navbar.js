import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './Navbar.css';

import Web3 from 'web3';
import Web3Modal from 'web3modal';
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

const Navbar = (props) => {
  const [account, setAccount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  useEffect(() => {
    if (account) {
      props.setWallet(account);
    }
  }, [props, account]);

  const providerOptions = {};
  const web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    providerOptions, // required
  });

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
        <p>Connected with: {account}</p>
        <div>
          {isLoading ? (
            <Button
              variant='contained'
              onClick={() => {
                connectPrompt();
                handleOpen();
              }}
            >
              Connect
            </Button>
          ) : (
            <Button variant='contained' onClick={() => disconnect()}>
              Disconnect
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
              </Box>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
