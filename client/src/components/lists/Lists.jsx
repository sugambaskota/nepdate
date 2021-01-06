import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Lists.style.scss';
import { getLikers, getLiked, likeUser, unlikeUser } from '../../actions/like';
import Spinner from '../layout/spinner/Spinner';
import MemberCard from '../members/member-card/MemberCard';

export const Lists = ({
  like: { likers, liked, loading },
  getLikers,
  getLiked,
  likeUser,
  unlikeUser,
}) => {
  const [tabActive, setTabActive] = useState('likers');

  useEffect(() => {
    if (tabActive === 'likers') {
      getLikers();
    } else {
      getLiked();
    }
  }, [tabActive, getLikers, getLiked]);

  const isTabActive = (tabname) => {
    if (tabname === tabActive) {
      return true;
    }
    return false;
  };

  const determineTabContent = () => {
    if (tabActive === 'likers') {
      return (
        <Fragment>
          {likers &&
            likers.map((liker) => <MemberCard key={liker.id} user={liker} />)}
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {liked &&
            liked.map((liked) => <MemberCard key={liked.id} user={liked} />)}
        </Fragment>
      );
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='likers-liked-btns'>
        <button
          className={`likers-btn${isTabActive('likers') ? ' active' : ''}`}
          onClick={() => setTabActive('likers')}
        >
          Likers
        </button>
        <button
          className={`liked-btn${isTabActive('liked') ? ' active' : ''}`}
          onClick={() => setTabActive('liked')}
        >
          Liked
        </button>
      </div>
      <div className='likers-liked-content'>{determineTabContent()}</div>
    </Fragment>
  );
};

Lists.propTypes = {
  like: PropTypes.object.isRequired,
  getLikers: PropTypes.func.isRequired,
  getLiked: PropTypes.func.isRequired,
  likeUser: PropTypes.func.isRequired,
  unlikeUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  like: state.like,
});

const mapDispatchToProps = {
  getLikers,
  getLiked,
  likeUser,
  unlikeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
