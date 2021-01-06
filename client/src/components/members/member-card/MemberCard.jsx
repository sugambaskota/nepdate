import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './MemberCard.style.scss';

const MemberCard = ({ user }) => {
  return (
    <div className='card'>
      <div className='image'>
        <img src={user.dp} alt='' />
      </div>
      <div className='details'>
        <p>
          {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}{' '}
          {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)},{' '}
          {user.age}
        </p>
      </div>
      <div className='controls'>
        <Link to={`/profile/${user.id}`}>
          <div className='control-item'>
            <i className='fa fa-user'></i>
          </div>
        </Link>
        <Link to={`/messages/thread/${user.id}`}>
          <div className='control-item'>
            <i className='fa fa-envelope'></i>
          </div>
        </Link>
      </div>
    </div>
  );
};

MemberCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MemberCard;
