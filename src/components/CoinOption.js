import React from 'react';

const CoinOption = (props) => {
  return <option value={props.coinOption.id}>{props.coinOption.name}</option>;
};

export default CoinOption;
