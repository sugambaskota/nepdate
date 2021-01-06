import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.style.scss';

const NotFound = ({ history }) => {
  return (
    <div className='not-found'>
      ☹☹
      <h2>Sorry, The page you are looking for is not found!</h2>
      ☹☹
      <button className='go-back-btn' onClick={history.goBack}>
        Go Back
      </button>
      <Link to='/' className='go-home-btn'>
        Go To Home
      </Link>
    </div>
  );
};

export default NotFound;
