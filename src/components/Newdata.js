import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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

const Newdata = (props) => {
  const [open, setOpen] = useState(false);
  const handleNewdata = props.handleNewdata;

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(handleNewdata);
  }, [handleNewdata]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {props.modalData.name}
            <img src={props.modalData.image.thumb} alt='/'></img>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Coin Gecko Coin Rank: {props.modalData.coingecko_rank}
          </Typography>
          <p>
            Current Price: $
            {props.modalData.market_data.current_price.usd
              ?.toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
          <p>
            Market Cap: $
            {props.modalData.market_data.market_cap.usd
              ?.toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
          <Button onClick={handleClose}>Close modal</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Newdata;
