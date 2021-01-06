import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Members.style.scss';
import { getUsers } from '../../actions/users';
import Spinner from '../layout/spinner/Spinner';
import MemberCard from './member-card/MemberCard';
import Pagination from '../layout/pagination/Pagination';

export const Members = ({
  history,
  users: { users, pagination, loading },
  getUsers,
}) => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onChange = (pageNumber) => getUsers(pageNumber);

  const onSubmit = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/members/search',
      state: {
        q: searchText,
      },
    });
  };

  const searchForm = (
    <form className='search-form' onSubmit={onSubmit}>
      <input
        type='text'
        className='search-box'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        type='submit'
        disabled={!searchText || searchText.length === 0}
        className='search-btn'
      >
        <i className='fa fa-search fa-lg'></i>
      </button>
    </form>
  );

  return loading ? (
    <Spinner />
  ) : users ? (
    <Fragment>
      {searchForm}
      <div className='members-container'>
        {users.map((user) => (
          <MemberCard user={user} key={user.id} />
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
    <p className='not-found-text'>Sorry, no users found!</p>
  );
};

Members.propTypes = {
  users: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
