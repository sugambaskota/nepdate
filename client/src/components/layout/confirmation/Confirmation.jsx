import React from 'react';
import PropTypes from 'prop-types';

import './Confirmation.style.scss';

const Confirmation = ({
  text = 'Are you sure you want to continue?',
  yesAction,
  noAction,
}) => {
  return (
    <div className='confirmation-container open'>
      <div className='confirmation'>
        <p className='confirmation-text'>{text}</p>
        <div className='confirmation-actions'>
          <button
            onClick={yesAction}
            className='confirmation-button confirmation-button-yes'
          >
            Yes
          </button>
          <button
            onClick={noAction}
            className='confirmation-button confirmation-button-no'
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

Confirmation.propTypes = {
  text: PropTypes.string,
  yesAction: PropTypes.func.isRequired,
  noAction: PropTypes.func.isRequired,
};

export default Confirmation;
