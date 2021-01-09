import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import './EditProfile.style.scss';
import EditPrimaryDetails from './edit-primary-details/EditPrimaryDetails';
import EditPhotos from './edit-photos/EditPhotos';
import Spinner from '../../layout/spinner/Spinner';
import { getCurrentUserProfile, updateProfile } from '../../../actions/profile';
import { uploadDp } from '../../../actions/photo';

export const EditProfile = ({
  history,
  profile: { profile, loading },
  photo,
  getCurrentUserProfile,
  updateProfile,
  uploadDp,
}) => {
  const [formData, setFormData] = useState({
    description: '',
    lookingfor: '',
    interest: '',
    city: '',
    country: '',
  });

  const [tabActive, setTabActive] = useState('edit-details');

  const dpChangeInputRef = useRef(null);

  useEffect(() => {
    getCurrentUserProfile();
  }, [getCurrentUserProfile]);

  useEffect(() => {
    setFormData({
      description: loading || !profile.description ? '' : profile.description,
      lookingfor: loading || !profile.lookingfor ? '' : profile.lookingfor,
      interest: loading || !profile.interest ? '' : profile.interest,
      city: loading || !profile.city ? '' : profile.city,
      country: loading || !profile.country ? '' : profile.country,
    });
  }, [loading, profile]);

  const { description, lookingfor, interest, city, country } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onFilePickedForDp = (e) => {
    if (!e.target.files || e.target.files.length < 1) {
      return;
    }
    const photo = e.target.files[0];
    uploadDp(photo);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData, history);
  };

  const isTabActive = (tabName) => {
    if (tabName === tabActive) {
      return true;
    } else {
      return false;
    }
  };

  const determineTabContent = () => {
    switch (tabActive) {
      case 'edit-details':
        return (
          <div className='edit-profile-details-container'>
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
                Update
              </button>
            </form>
          </div>
        );
      case 'edit-primary-details':
        return <EditPrimaryDetails />;
      case 'edit-photos':
        return <EditPhotos />;
      default:
        return;
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className='edit-profile-container'>
      <div className='intro general-intro'>
        <div className='main-image'>
          <img src={profile.user.dp} alt='dp of user' />
          <div className='change-dp-portion'>
            {photo.loading ? (
              <i className='fa fa-refresh fa-spin loading-i' />
            ) : (
              <i
                className='fa fa-edit fa-lg'
                onClick={() => dpChangeInputRef.current.click()}
              />
            )}
            <input
              type='file'
              className='change-dp-input'
              onChange={onFilePickedForDp}
              ref={dpChangeInputRef}
            />
          </div>
        </div>
        <div className='main-details'>
          <div className='main-detail-item'>
            <label className='main-details-label'>Age:</label>
            <p>{profile.user.age}</p>
          </div>
          <div className='main-detail-item'>
            <label className='main-details-label'>Location:</label>
            <p>
              {profile.city.charAt(0).toUpperCase() + profile.city.slice(1)},{' '}
              {profile.country.charAt(0).toUpperCase() +
                profile.country.slice(1)}
            </p>
          </div>
          <div className='main-detail-item'>
            <label className='main-details-label'>Last login:</label>
            <p>{moment(profile.user.lastActive).fromNow()}</p>
          </div>
          <div className='main-detail-item'>
            <label className='main-details-label'>Member since:</label>
            <p>{moment(profile.user.dateJoined).format('MMMM Do, YYYY')}</p>
          </div>
        </div>
      </div>
      <div className='intro more-intro'>
        <ul className='more-intro-head'>
          <li
            className={`edit-details${
              isTabActive('edit-details') ? ' active' : ''
            }`}
            onClick={() => setTabActive('edit-details')}
          >
            Edit details
          </li>
          <li
            className={`edit-primary-details${
              isTabActive('edit-primary-details') ? ' active' : ''
            }`}
            onClick={() => setTabActive('edit-primary-details')}
          >
            Edit primary details
          </li>
          <li
            className={`edit-photos${
              isTabActive('edit-photos') ? ' active' : ''
            }`}
            onClick={() => setTabActive('edit-photos')}
          >
            Edit photos
          </li>
        </ul>
        <div className='more-intro-content'>{determineTabContent()}</div>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  photo: PropTypes.object.isRequired,
  getCurrentUserProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  uploadDp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  photo: state.photo,
});

const mapDispatchToProps = {
  getCurrentUserProfile,
  updateProfile,
  uploadDp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
