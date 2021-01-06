import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './ThreadCard.style.scss';

const ThreadCard = ({ msg, user }) => {
  return (
    <div className={`msg-card${msg.sender.id === user.id ? ' right' : ''}`}>
      <img src={msg.sender.dp} alt='chat user' className='msg-card-img' />
      <br />
      {msg.text}
      <br />
      <small>{moment(msg.date).fromNow()}</small>
    </div>
  );
};

ThreadCard.propTypes = {
  msg: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default ThreadCard;
