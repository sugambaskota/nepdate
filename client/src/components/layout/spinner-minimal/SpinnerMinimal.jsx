import React from 'react';
import Spinner2 from './img/spinner2.gif';

import './SpinnerMinimal.style.scss';

const SpinnerMinimal = () => {
  return (
    <div className='spinner'>
      <div className='spinner__image'>
        <img src={Spinner2} alt='loading' />
      </div>
    </div>
  );
};

export default SpinnerMinimal;
