import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

import './Photos.style.scss';

const Photos = ({ items }) => {
  return items.length > 0 ? (
    <div className='gallery'>
      <ImageGallery items={items} />
    </div>
  ) : (
    <div>No images to display!</div>
  );
};

Photos.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Photos;
