import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import './Login.style.scss';
import { login } from '../../../actions/auth';
import Spinner from '../../layout/spinner/Spinner';

const Login = ({ auth: { isAuthenticated, loading }, login }) => {
  const [formData, setFormData] = useState({
    email: {
      value: '',
      touched: false,
      valid: false,
      errText: 'Please enter a valid email',
    },
    password: {
      value: '',
      touched: false,
      valid: false,
      errText: 'Please enter a valid password',
    },
  });

  const { email, password } = formData;

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    login(email.value, password.value);
  };

  const isEmailValid = (value) => {
    let regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regEmail.test(value)) {
      return true;
    } else {
      return false;
    }
  };

  const isPasswordValid = (value) => {
    if (value.length > 5) {
      return true;
    } else {
      return false;
    }
  };

  const onBlur = (e) => {
    switch (e.target.name) {
      case 'email':
        return setFormData({
          ...formData,
          email: {
            ...email,
            touched: true,
          },
        });
      case 'password':
        return setFormData({
          ...formData,
          password: {
            ...password,
            touched: true,
          },
        });
      default:
        return;
    }
  };

  const onChange = (e) => {
    switch (e.target.name) {
      case 'email':
        return setFormData({
          ...formData,
          email: {
            ...email,
            value: e.target.value,
            valid: isEmailValid(e.target.value),
          },
        });
      case 'password':
        return setFormData({
          ...formData,
          password: {
            ...password,
            value: e.target.value,
            valid: isPasswordValid(e.target.value),
          },
        });
      default:
        return;
    }
  };

  return (
    <Fragment>
      {loading && <Spinner />}
      <div className='login'>
        <h2 className='login-title'>NepDate Login</h2>
        <form className='login-form' onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              className={`form-group-input${
                email.touched && !email.valid ? ' invalid' : ''
              }`}
              type='email'
              placeholder='Email'
              name='email'
              value={email.value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {email.touched && !email.valid && (
              <small className='form-text-danger'>
                {formData.email.errText}
              </small>
            )}
          </div>
          <div className='form-group'>
            <input
              className={`form-group-input${
                password.touched && !password.valid ? ' invalid' : ''
              }`}
              type='password'
              placeholder='Password'
              name='password'
              value={password.value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {password.touched && !password.valid && (
              <small className='form-text-danger'>
                {formData.password.errText}
              </small>
            )}
          </div>
          <div className='form-group'>
            <button
              type='submit'
              className='form-group-button'
              disabled={!email.valid || !password.valid}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
