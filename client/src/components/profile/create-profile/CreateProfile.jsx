import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './CreateProfile.style.scss';
import { createProfile } from '../../../actions/profile';

export const CreateProfile = ({ history, createProfile }) => {
  const [formData, setFormData] = useState({
    description: '',
    lookingfor: '',
    interest: '',
    city: '',
    country: '',
  });

  const { description, lookingfor, interest, city, country } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <div className='create-profile-container'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label className='form-label'>Description:</label>
          <textarea
            rows='8'
            name='description'
            className='description form-item'
            onChange={onChange}
            value={description}
          ></textarea>
        </div>
        <div className='form-group'>
          <label className='form-label'>Looking for:</label>
          <textarea
            rows='8'
            name='lookingfor'
            className='lookingfor form-item'
            onChange={onChange}
            value={lookingfor}
          ></textarea>
        </div>
        <div className='form-group'>
          <label className='form-label'>Interest:</label>
          <textarea
            rows='8'
            name='interest'
            className='interest form-item'
            onChange={onChange}
            value={interest}
          ></textarea>
        </div>
        <div className='form-group'>
          <label className='form-label'>City:</label>
          <input
            type='text'
            name='city'
            className='city form-item'
            autoComplete='off'
            onChange={onChange}
            value={city}
          />
        </div>
        <div className='form-group'>
          <label className='form-label'>Country:</label>
          <input
            type='text'
            name='country'
            className='country form-item'
            autoComplete='off'
            onChange={onChange}
            value={country}
          />
        </div>
        <button type='submit' className='submit-btn'>
          Create
        </button>
      </form>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  createProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateProfile));
