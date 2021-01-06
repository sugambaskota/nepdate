import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import './EditPrimaryDetails.style.scss';
import { updateUser } from '../../../../actions/auth';

export const EditPrimaryDetails = ({ history, auth: { user }, updateUser }) => {
  const [formData, setFormData] = useState({
    fname: {
      value: user.firstName,
      touched: false,
      valid: true,
      errText: 'Please enter a valid first name',
    },
    mname: {
      value: user.middleName,
    },
    lname: {
      value: user.lastName,
      touched: false,
      valid: true,
      errText: 'Please enter a valid last name',
    },
    gender: {
      value: user.gender,
      touched: false,
      valid: true,
      errText: 'Please choose a gender',
    },
    dob: {
      value: moment(user.dob).format('YYYY-MM-DD'),
      touched: false,
      valid: true,
      errText: 'Please enter your date of birth',
    },
  });

  const { fname, mname, lname, gender, dob } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser(
      {
        fname: fname.value,
        mname: mname.value,
        lname: lname.value,
        gender: gender.value,
        dob: dob.value,
      },
      history
    );
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
      default:
        return;
    }
  };

  return (
    <div className='edit-primary-details-container'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label className='form-label'>First name:</label>
          <input
            type='text'
            name='fname'
            className={`fname form-item${
              fname.touched && !fname.valid ? ' invalid' : ''
            }`}
            autoComplete='off'
            onChange={onChange}
            onBlur={onBlur}
            value={fname.value.charAt(0).toUpperCase() + fname.value.slice(1)}
          />
          {fname.touched && !fname.valid && (
            <small className='form-text-danger'>{fname.errText}</small>
          )}
        </div>
        <div className='form-group'>
          <label className='form-label'>Middle name:</label>
          <input
            type='text'
            name='mname'
            className='mname form-item'
            autoComplete='off'
            onChange={onChange}
            value={
              mname.value &&
              mname.value.charAt(0).toUpperCase() + mname.value.slice(1)
            }
          />
        </div>
        <div className='form-group'>
          <label className='form-label'>Last name:</label>
          <input
            type='text'
            name='lname'
            className={`lname form-item${
              lname.touched && !lname.valid ? ' invalid' : ''
            }`}
            autoComplete='off'
            onChange={onChange}
            onBlur={onBlur}
            value={lname.value.charAt(0).toUpperCase() + lname.value.slice(1)}
          />
          {lname.touched && !lname.valid && (
            <small className='form-text-danger'>{lname.errText}</small>
          )}
        </div>
        <div className='form-group'>
          <label className='form-label'>Gender:</label>
          <select
            required
            name='gender'
            className={`gender form-item${
              gender.touched && !gender.valid ? ' invalid' : ''
            }`}
            onChange={onChange}
            onBlur={onBlur}
            value={gender.value}
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          {gender.touched && !gender.valid && (
            <small className='form-text-danger'>{gender.errText}</small>
          )}
        </div>
        <div className='form-group'>
          <label className='form-label'>Date of birth:</label>
          <input
            type='date'
            name='dob'
            className={`dob form-item${
              dob.touched && !dob.valid ? ' invalid' : ''
            }`}
            autoComplete='off'
            onChange={onChange}
            onBlur={onBlur}
            value={dob.value}
          />
          {dob.touched && !dob.valid && (
            <small className='form-text-danger'>{dob.errText}</small>
          )}
        </div>
        <button
          type='submit'
          className='submit-btn'
          disabled={!fname.valid || !lname.valid || !gender.valid || !dob.valid}
        >
          Update
        </button>
      </form>
    </div>
  );
};

EditPrimaryDetails.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  updateUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditPrimaryDetails));
