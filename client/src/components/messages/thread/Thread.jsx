import React, { Fragment, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Thread.style.scss';
import socket from '../../../utils/socket';
import { getMessageThread, sendMessage, receivePrivateMessage } from '../../../actions/message';
import Spinner from '../../layout/spinner/Spinner';
import ThreadCard from './thread-card/ThreadCard';

export const Thread = ({
  match,
  message: { thread, loading },
  auth: { user },
  getMessageThread,
  sendMessage,
  receivePrivateMessage
}) => {
  const [chatMsg, setChatMsg] = useState('');
  const scrollDivRef = useRef(null);

  useEffect(() => {
    getMessageThread(match.params.user_id);
  }, [getMessageThread, match.params.user_id]);

  useEffect(() => {
    scrollToBottom();
  }, [thread]);

  useEffect(() => {
    socket.on("privateMessage", (message) => {
      receivePrivateMessage(message);
    });
  }, [receivePrivateMessage]);

  const scrollToBottom = () => {
    scrollDivRef.current &&
      scrollDivRef.current.scrollIntoView({ behaviour: 'smooth' });
  };

  const renderCards = () => {
    return (
      thread &&
      thread.map((msg) => <ThreadCard key={msg.id} msg={msg} user={user} />)
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(match.params.user_id, chatMsg);
    setChatMsg('');
  };

  const msgForm = (
    <form className='msg-form' onSubmit={onSubmit}>
      <input
        type='text'
        className='msg-msg'
        value={chatMsg}
        placeholder='Type message here...'
        onChange={(e) => setChatMsg(e.target.value)}
      />
      <button
        type='submit'
        disabled={!chatMsg || !chatMsg.length > 0}
        className='msg-btn-submit'
      >
        Send
      </button>
    </form>
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='msg'>
        <div className='msg-history-holder'>
          <div className='msg-history'>
            {renderCards()}
            <div ref={scrollDivRef}></div>
          </div>
        </div>
        {msgForm}
      </div>
    </Fragment>
  );
};

Thread.propTypes = {
  message: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getMessageThread: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  receivePrivateMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.message,
  auth: state.auth,
});

const mapDispatchToProps = {
  getMessageThread,
  sendMessage,
  receivePrivateMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
