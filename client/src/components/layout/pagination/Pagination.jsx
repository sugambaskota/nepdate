import React from 'react';
import PropTypes from 'prop-types';

import './Pagination.style.scss';

const Pagination = ({
  currentPage,
  pageSize,
  totalPages,
  totalCount,
  onChange,
}) => {
  let pageNumbers = [];
  let startIndex = currentPage > 3 ? currentPage - 2 : 1;
  let endIndex = currentPage + 2;
  for (let i = startIndex; i <= endIndex && i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const isPageActive = (pageNumber) => {
    return pageNumber === currentPage;
  };

  return (
    <ul className='page-numbers'>
      <li className='page-number'>
        <button
          className='page-number-btn'
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          &#10216;
        </button>
      </li>
      {pageNumbers.map((pageNumber) => (
        <li className='page-number' key={pageNumber}>
          <button
            className={`page-number-btn${
              isPageActive(pageNumber) ? ' active' : ''
            }`}
            onClick={() => onChange(pageNumber)}
            disabled={isPageActive(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}
      <li className='page-number'>
        <button
          className='page-number-btn'
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          &#10217;
        </button>
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;
