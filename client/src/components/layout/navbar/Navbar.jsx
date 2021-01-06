import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './Navbar.style.scss';
import { logout } from '../../../actions/auth';

export const Navbar = ({
  auth: { isAuthenticated, user },
  logout,
  history,
}) => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const isActive = (history, pathname) => {
    if (history.location.pathname === pathname) return true;
    else return false;
  };

  const guestLinks = (
    <ul className='links-right'>
      <li
        className={`links-right-item${
          isActive(history, '/login') ? ' active' : ''
        }`}
      >
        <Link to='/login' onClick={() => setShowMobileNav(false)}>
          Login
        </Link>
      </li>
      <li
        className={`links-right-item${
          isActive(history, '/register') ? ' active' : ''
        }`}
      >
        <Link to='/register' onClick={() => setShowMobileNav(false)}>
          Register
        </Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className='links-right'>
      {isAuthenticated && user && user.role === 'admin' && (
        <li
          className={`links-right-item${
            isActive(history, '/admin') ? ' active' : ''
          }`}
        >
          <Link to='/admin' onClick={() => setShowMobileNav(false)}>
            Admin
          </Link>
        </li>
      )}
      <li
        className={`links-right-item${
          isActive(history, '/members') ? ' active' : ''
        }`}
      >
        <Link to='/members' onClick={() => setShowMobileNav(false)}>
          Members
        </Link>
      </li>
      <li
        className={`links-right-item${
          isActive(history, '/lists') ? ' active' : ''
        }`}
      >
        <Link to='/lists' onClick={() => setShowMobileNav(false)}>
          Lists
        </Link>
      </li>
      <li
        className={`links-right-item${
          isActive(history, '/messages') ? ' active' : ''
        }`}
      >
        <Link to='/messages' onClick={() => setShowMobileNav(false)}>
          Messages
        </Link>
      </li>
      {user && (
        <div className='dropdown'>
          <div className='dropbtn'>
            <img src={user.dp} alt='' />
            &nbsp;
            <i className='fa fa-angle-down'></i>
          </div>
          <ul className='dropdown-content'>
            <li>
              <Link to='/profile' onClick={() => setShowMobileNav(false)}>
                Profile
              </Link>
            </li>
            <li>
              <a
                href='#!'
                onClick={() => {
                  setShowMobileNav(false);
                  logout();
                  history.push('/');
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </ul>
  );

  return (
    <Fragment>
      <nav className='navbar'>
        <div className='brand'>
          <div
            className='nav-toggle-button'
            onClick={() => setShowMobileNav(true)}
          >
            &#9776;
          </div>
          <Link to='/' className='brand-logo'>
            Nep<span className='brand-colored'>Date</span>
          </Link>
        </div>
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
      <nav className={`mobile-nav${showMobileNav ? ' open' : ''}`}>
        <button
          className='mobile-nav-close-btn'
          onClick={() => setShowMobileNav(false)}
        >
          X
        </button>
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  logout,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
