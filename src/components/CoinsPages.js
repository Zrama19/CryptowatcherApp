import React from 'react';

const CoinsPage = (props) => {
  return (
    <div>
      <a href={`/coins/${props.page}`}>{props.page}</a>
    </div>
  );
};

export default CoinsPage;
