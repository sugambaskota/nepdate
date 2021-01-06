import React from 'react';

import './Spinner.style.scss';
import spinner1 from './img/spinner1.gif';

const Spinner = () => {
  return (
    <div className='spinner-container'>
      <div className='spinner'>
        <img src={spinner1} alt='loading' />
      </div>
    </div>
  );
};

export default Spinner;
