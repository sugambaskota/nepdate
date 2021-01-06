import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './MessageCard.style.scss';

const MessageCard = ({ msg, user }) => {
  const determineOtherUser = (sender, receiver) => {
    return sender.id === user.id ? receiver : sender;
  };

  const otherUser = determineOtherUser(msg.sender, msg.receiver);

  return (
    <Link to={`/messages/thread/${otherUser.id}`}>
      <div className='message-card'>
        <div className='message-card-image'>
          <img src={otherUser.dp} alt={otherUser.firstName} />
        </div>
        <div className='message-card-content'>
          <p className='other-user-name'>
            {otherUser.firstName.charAt(0).toUpperCase() +
              otherUser.firstName.slice(1)}{' '}
            {otherUser.lastName.charAt(0).toUpperCase() +
              otherUser.lastName.slice(1)}
          </p>
          <p className='msg-text'>
            {msg.sender.id === user.id && 'You: '}
            {msg.text}
          </p>
        </div>
      </div>
    </Link>
  );
};

MessageCard.propTypes = {
  msg: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default MessageCard;
