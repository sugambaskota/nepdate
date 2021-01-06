import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import './Register.style.scss';
import { register } from '../../../actions/auth';
import Spinner from '../../layout/spinner/Spinner';

const Register = ({ auth: { isAuthenticated, loading }, register }) => {
  const [formData, setFormData] = useState({
    fname: {
      value: '',
      touched: false,
      valid: false,
      errText: 'Please enter valid first name',
    },
    mname: {
      value: '',
    },
    lname: {
      value: '',
      touched: false,
      valid: false,
      errText: 'Please enter valid last name',
    },
    gender: {
      value: '',
      touched: false,
      valid: false,
      errText: 'Please choose a gender',
    },
    dob: {
      value: '',
      touched: false,
      valid: false,
      errText: 'Please enter your date of birth',
    },
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
    password2: {
      value: '',
      touched: false,
      valid: false,
      errText: 'Passwords do not match',
    },
  });

  const {
    fname,
    mname,
    lname,
    gender,
    dob,
    email,
    password,
    password2,
  } = formData;

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    register({
      firstname: fname.value,
      middlename: mname.value,
      lastname: lname.value,
      gender: gender.value,
      dob: dob.value,
      email: email.value,
      password: password.value,
    });
  };

  const isFnameValid = (value) => {
    if (value.length > 1) {
      return true;
    } else {
      return false;
    }
  };

  const isLnameValid = (value) => {
    if (value.length > 1) {
      return true;
    } else {
      return false;
    }
  };

  const isGenderValid = (value) => {
    if (value === 'male' || value === 'female') {
      return true;
    } else {
      return false;
    }
  };

  const isDobValid = (value) => {
    if (value.length > 2) {
      return true;
    } else {
      return false;
    }
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

  const isPassword2Valid = (value) => {
    if (password.value === value) {
      return true;
    } else {
      return false;
    }
  };

  const onBlur = (e) => {
    switch (e.target.name) {
      case 'fname':
        return setFormData({
          ...formData,
          fname: {
            ...fname,
            touched: true,
          },
        });
      case 'lname':
        return setFormData({
          ...formData,
          lname: {
            ...lname,
            touched: true,
          },
        });
      case 'gender':
        return setFormData({
          ...formData,
          gender: {
            ...gender,
            touched: true,
          },
        });
      case 'dob':
        return setFormData({
          ...formData,
          dob: {
            ...dob,
            touched: true,
          },
        });
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
      case 'password2':
        return setFormData({
          ...formData,
          password2: {
            ...password2,
            touched: true,
          },
        });
      default:
        return;
    }
  };

  const onChange = (e) => {
    switch (e.target.name) {
      case 'fname':
        return setFormData({
          ...formData,
          fname: {
            ...fname,
            value: e.target.value,
            valid: isFnameValid(e.target.value),
          },
        });
      case 'mname':
        return setFormData({
          ...formData,
          mname: {
            ...mname,
            value: e.target.value,
          },
        });
      case 'lname':
        return setFormData({
          ...formData,
          lname: {
            ...lname,
            value: e.target.value,
            valid: isLnameValid(e.target.value),
          },
        });
      case 'gender':
        return setFormData({
          ...formData,
          gender: {
            ...gender,
            value: e.target.value,
            valid: isGenderValid(e.target.value),
          },
        });
      case 'dob':
        return setFormData({
          ...formData,
          dob: {
            ...dob,
            value: e.target.value,
            valid: isDobValid(e.target.value),
          },
        });
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
      case 'password2':
        return setFormData({
          ...formData,
          password2: {
            ...password2,
            value: e.target.value,
            valid: isPassword2Valid(e.target.value),
          },
        });
      default:
        return;
    }
  };

  return (
    <Fragment>
      {loading && <Spinner />}
      <div className='signup'>
        <h2 className='signup-title'>NepDate Register</h2>
        <form className='signup-form' onSubmit={onSubmit}>
          <div className='user-name'>
            <div className='form-group'>
              <input
                className={`form-group-input${
                  fname.touched && !fname.valid ? ' invalid' : ''
                }`}
                type='text'
                placeholder='First name'
                name='fname'
                autoComplete='off'
                value={fname.value}
                onChange={onChange}
                onBlur={onBlur}
              />
              {fname.touched && !fname.valid && (
                <small className='form-text-danger'>{fname.errText}</small>
              )}
            </div>
            <div className='form-group'>
              <input
                className='form-group-input'
                type='text'
                placeholder='Middle name'
                autoComplete='off'
                name='mname'
                value={mname.value}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                className={`form-group-input${
                  lname.touched && !lname.valid ? ' invalid' : ''
                }`}
                type='text'
                placeholder='Last name'
                name='lname'
                autoComplete='off'
                value={lname.value}
                onChange={onChange}
                onBlur={onBlur}
              />
              {lname.touched && !lname.valid && (
                <small className='form-text-danger'>{lname.errText}</small>
              )}
            </div>
          </div>
          <div className='form-group'>
            <select
              required
              name='gender'
              className={`select-gender form-group-input${
                gender.touched && !gender.valid ? ' invalid' : ''
              }`}
              onChange={onChange}
              onBlur={onBlur}
            >
              <option value='' hidden>
                Please choose a gender
              </option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
            {gender.touched && !gender.valid && (
              <small className='form-text-danger'>{gender.errText}</small>
            )}
          </div>
          <div className='form-group'>
            <input
              className={`form-group-input${
                email.touched && !email.valid ? ' invalid' : ''
              }`}
              type='email'
              placeholder='Email'
              name='email'
              autoComplete='off'
              value={email.value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {email.touched && !email.valid && (
              <small className='form-text-danger'>{email.errText}</small>
            )}
          </div>
          <div className='form-group'>
            <input
              className={`form-group-input${
                dob.touched && !dob.valid ? ' invalid' : ''
              }`}
              type='date'
              placeholder='Date of birth'
              name='dob'
              value={dob.value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {dob.touched && !dob.valid && (
              <small className='form-text-danger'>{dob.errText}</small>
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
              <small className='form-text-danger'>{password.errText}</small>
            )}
          </div>
          <div className='form-group'>
            <input
              className={`form-group-input${
                password2.touched && !password2.valid ? ' invalid' : ''
              }`}
              type='password'
              placeholder='Enter password again'
              name='password2'
              value={password2.value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {password2.touched && !password2.valid && (
              <small className='form-text-danger'>{password2.errText}</small>
            )}
          </div>
          <div className='form-group'>
            <button
              type='submit'
              className='form-group-button'
              disabled={
                !fname.valid ||
                !lname.valid ||
                !gender.valid ||
                !email.valid ||
                !password.valid ||
                !password2.valid
              }
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
