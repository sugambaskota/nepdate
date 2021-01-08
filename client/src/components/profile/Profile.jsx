import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './Profile.style.scss';
import Spinner from '../layout/spinner/Spinner';
import {
  getProfileByUserId,
  getCurrentUserProfile,
} from '../../actions/profile';
import { likeUser, unlikeUser } from '../../actions/like';
import About from './tabs/about/About';
import Interest from './tabs/interest/Interest';
import Photos from './tabs/photos/Photos';

export const Profile = ({
  match,
  profile: { profile, loading },
  like,
  getProfileByUserId,
  getCurrentUserProfile,
  likeUser,
  unlikeUser,
}) => {
  const [tabActive, setTabActive] = useState('about');

  useEffect(() => {
    if (match.params.user_id) {
      getProfileByUserId(match.params.user_id);
    } else {
      getCurrentUserProfile();
    }
  }, [getProfileByUserId, getCurrentUserProfile, match.params.user_id]);

  const likeUnlikeUser = (user_id) => {
    if (profile.liked) {
      return unlikeUser(user_id);
    }

    likeUser(user_id);
  };

  const editOrMsgBtn = () => {
    if (match.params.user_id) {
      return (
        <div className='like-msg-btns'>
          <button className='liked-btn-info'>
            {profile.liked ? 'Liked' : 'Not liked'}
          </button>
          {like.loading ? (
            <div className='liked-btn-loading'>
              <i className='fa fa-refresh fa-spin'></i>
            </div>
          ) : (
            <button
              className='liked-btn'
              onClick={() => likeUnlikeUser(match.params.user_id)}
            >
              {profile.liked ? 'Unlike User' : 'Like User'}
            </button>
          )}
          <Link
            to={`/messages/thread/${match.params.user_id}`}
            className='msg-user-btn'
          >
            <i className='fa fa-envelope'></i>
          </Link>
        </div>
      );
    }
    return (
      <Link to='/edit-profile' className='profile-edit-btn'>
        <i className='fa fa-pencil'></i>
      </Link>
    );
  };

  const determineTabContent = () => {
    switch (tabActive) {
      case 'about':
        return (
          <About
            about={{
              description: profile.description,
              lookingfor: profile.lookingfor,
            }}
          />
        );
      case 'interest':
        return <Interest interest={profile.interest} />;
      case 'photos':
        return (
          <Photos
            items={profile.photos.map((photo) => {
              return {
                original: photo.path,
                thumbnail: photo.path,
              };
            })}
          />
        );
      default:
        return (
          <About
            about={{
              description: profile.description,
              lookingfor: profile.lookingfor,
            }}
          />
        );
    }
  };

  const isTabActive = (tabName) => {
    if (tabName === tabActive) {
      return true;
    }
    return false;
  };

  return loading ? (
    <Spinner />
  ) : !profile ? (
    !match.params.user_id ? (
      <p className='not-found-text'>
        You have not created your profile yet! Click{' '}
        <Link className='click-here' to='/create-profile'>
          here
        </Link>{' '}
        to create.
      </p>
    ) : (
      <p className='not-found-text'>No profile found!</p>
    )
  ) : (
    <Fragment>
      <div className='profile-heading'>
        <p className='profile-title'>
          {profile.user.firstName.charAt(0).toUpperCase() +
            profile.user.firstName.slice(1)}
          's profile
        </p>
        {editOrMsgBtn()}
      </div>

      <div className='profile-container'>
        <div className='intro general-intro'>
          <div className='main-image'>
            <img src={profile.user.dp} alt='' />
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
              className={`about${isTabActive('about') ? ' active' : ''}`}
              onClick={() => setTabActive('about')}
            >
              About{' '}
              {profile.user.firstName.charAt(0).toUpperCase() +
                profile.user.firstName.slice(1)}
            </li>
            <li
              className={`interest${isTabActive('interest') ? ' active' : ''}`}
              onClick={() => setTabActive('interest')}
            >
              Interest
            </li>
            <li
              className={`photos${isTabActive('photos') ? ' active' : ''}`}
              onClick={() => setTabActive('photos')}
            >
              Photos
            </li>
          </ul>
          <div className='more-intro-content'>{determineTabContent()}</div>
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  like: PropTypes.object.isRequired,
  getProfileByUserId: PropTypes.func.isRequired,
  getCurrentUserProfile: PropTypes.func.isRequired,
  likeUser: PropTypes.func.isRequired,
  unlikeUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  like: state.like,
});

const mapDispatchToProps = {
  getProfileByUserId,
  getCurrentUserProfile,
  likeUser,
  unlikeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
