import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Messages.style.scss';
import { getMessages } from '../../actions/message';
import Spinner from '../layout/spinner/Spinner';
import MessageCard from './message-card/MessageCard';
import Pagination from '../layout/pagination/Pagination';

export const Messages = ({
  message: { loading, messages, pagination },
  auth: { user },
  getMessages,
}) => {
  useEffect(() => {
    getMessages();
  }, [getMessages]);

  const onChange = (pageNumber) => getMessages(pageNumber);

  return loading ? (
    <Spinner />
  ) : messages && messages.length > 0 ? (
    <Fragment>
      <div className='messages-container'>
        {messages.map((msg) => (
          <MessageCard msg={msg} user={user} key={msg.id} />
        ))}
      </div>
      <Pagination
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        totalPages={pagination.totalPages}
        totalCount={pagination.totalCount}
        onChange={onChange}
      />
    </Fragment>
  ) : (
    <Fragment>
      <h2>Your messages box is empty!</h2>
    </Fragment>
  );
};

Messages.propTypes = {
  message: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.message,
  auth: state.auth,
});

const mapDispatchToProps = {
  getMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
