import React from 'react';
import PropTypes from 'prop-types';

import './About.style.scss';

const About = ({ about: { description, lookingfor } }) => {
  return (
    <div className='about-container'>
      <div className='description about-container-item'>
        <label>Description: </label>
        <p>{description}</p>
      </div>
      <div className='lookingfor about-container-item'>
        <label>Looking for: </label>
        <p>{lookingfor}</p>
      </div>
    </div>
  );
};

About.propTypes = {
  about: PropTypes.object.isRequired,
};

export default About;
