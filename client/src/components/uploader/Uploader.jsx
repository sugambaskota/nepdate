import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Uploader.style.scss';
import { uploadPhotos } from '../../actions/photo';

const Uploader = ({ uploadPhotos }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      uploadPhotos(acceptedFiles);
    },
    [uploadPhotos]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: 'image/jpg, image/jpeg, image/png',
  });

  return (
    <div className='upload' {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <i className='fa fa-cloud-upload active animate'></i>
      ) : (
        <i className='fa fa-cloud-upload animate'></i>
      )}
    </div>
  );
};

Uploader.propTypes = {
  uploadPhotos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  uploadPhotos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
