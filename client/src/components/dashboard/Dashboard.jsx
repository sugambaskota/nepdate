import React from 'react';
import { connect } from 'react-redux';

import './Dashboard.style.scss';

export const Dashboard = () => {
  return <div>This is dashboard page!</div>;
};

Dashboard.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
