import React from 'react';
import PropTypes from 'prop-types';

import './Interest.style.scss';

const Interest = ({ interest }) => {
  return (
    <div className='interest-container'>
      <div className='interest interest-container-item'>
        <p>{interest}</p>
      </div>
    </div>
  );
};

Interest.propTypes = {
  interest: PropTypes.string.isRequired,
};

export default Interest;
