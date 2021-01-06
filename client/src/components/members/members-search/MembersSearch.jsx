import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './MembersSearch.style.scss';
import Spinner from '../../layout/spinner/Spinner';
import { searchUsers } from '../../../actions/users';
import Pagination from '../../layout/pagination/Pagination';
import MemberCard from '../member-card/MemberCard';

export const MembersSearch = ({
  location,
  users: { loading, searchResult, searchPagination },
  searchUsers,
}) => {
  const [query] = useState(location.state.q);

  useEffect(() => {
    searchUsers(query);
  }, [searchUsers, query]);

  const onChange = (pageNumber) => searchUsers(query, pageNumber);

  return loading ? (
    <Spinner />
  ) : searchResult && searchResult.length > 0 ? (
    <Fragment>
      <p className='search-title'>Search results for search term '{query}'</p>
      <div className='search-members-container'>
        {searchResult.map((user) => (
          <MemberCard user={user} key={user.id} />
        ))}
      </div>
      <Pagination
        currentPage={searchPagination.currentPage}
        pageSize={searchPagination.pageSize}
        totalPages={searchPagination.totalPages}
        totalCount={searchPagination.totalCount}
        onChange={onChange}
      />
    </Fragment>
  ) : (
    <div>
      <p className='not-found-text'>
        Sorry, no results found for search term '{query}'
      </p>
    </div>
  );
};

MembersSearch.propTypes = {
  users: PropTypes.object.isRequired,
  searchUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  searchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersSearch);
