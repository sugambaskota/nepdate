import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import './Landing.style.scss';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/members' />;
  }

  return (
    <div className='landing-container'>
      <div className='dark-overlay'>
        <div className='landing-container-inner'>
          <h1 className='landing-title'>NepDate</h1>
          <p className='landing-desc'>
            Register and find your matching partner now!
          </p>
          <div className='auth-btns'>
            <Link to='/register' className='auth-btn register-btn'>
              Register
            </Link>
            <Link to='/login' className='auth-btn login-btn'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
