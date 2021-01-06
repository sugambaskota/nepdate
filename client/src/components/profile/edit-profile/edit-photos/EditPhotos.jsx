import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './EditPhotos.style.scss';
import Uploader from '../../../uploader/Uploader';
import Confirmation from '../../../layout/confirmation/Confirmation';
import SpinnerMinimal from '../../../layout/spinner-minimal/SpinnerMinimal';
import {
  getCurrentUserPhotos,
  setPhotoAsMain,
  deletePhoto,
} from '../../../../actions/photo';

export const EditPhotos = ({
  photo: { photos, loading },
  auth: { user },
  getCurrentUserPhotos,
  setPhotoAsMain,
  deletePhoto,
}) => {
  const [showSetMainConfirm, setShowSetMainConfirm] = useState(false);
  const [showDeletePhotoConfirm, setShowDeletePhotoConfirm] = useState(false);
  const [targetPhoto, setTargetPhoto] = useState('');

  useEffect(() => {
    getCurrentUserPhotos();
  }, [getCurrentUserPhotos]);

  const showSetMainConfirmYes = () => {
    setShowSetMainConfirm(false);
    setPhotoAsMain(targetPhoto);
  };

  const showSetMainConfirmNo = () => {
    setShowSetMainConfirm(false);
  };

  const showDeletePhotoConfirmYes = () => {
    setShowDeletePhotoConfirm(false);
    deletePhoto(targetPhoto);
  };

  const showDeletePhotoConfirmNo = () => {
    setShowDeletePhotoConfirm(false);
  };

  return loading ? (
    <SpinnerMinimal />
  ) : (
    <Fragment>
      {showSetMainConfirm && (
        <Confirmation
          text='Are you sure you want to set this photo as your main image?'
          yesAction={showSetMainConfirmYes}
          noAction={showSetMainConfirmNo}
        />
      )}
      {showDeletePhotoConfirm && (
        <Confirmation
          text='Are you sure you want to delete this photo?'
          yesAction={showDeletePhotoConfirmYes}
          noAction={showDeletePhotoConfirmNo}
        />
      )}
      <div className='edit-profile-photos-container'>
        <div className='photos-section'>
          {photos && photos.length > 0 ? (
            photos.map((photo) => (
              <div className='image' key={photo.path}>
                <img src={photo.path} alt='user' />
                <div className='image-controls animate'>
                  <button
                    className='image-control-item set-main-btn'
                    disabled={photo.path === user.dp}
                    onClick={() => {
                      setTargetPhoto(photo.path);
                      setShowSetMainConfirm(true);
                    }}
                  >
                    <i className='fa fa-circle'></i>
                  </button>
                  <button
                    className='image-control-item delete-photo-btn'
                    disabled={photo.path === user.dp}
                    onClick={() => {
                      setTargetPhoto(photo.path);
                      setShowDeletePhotoConfirm(true);
                    }}
                  >
                    <i className='fa fa-trash'></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>No photos found! You can upload your photos below.</div>
          )}
        </div>
        <Uploader />
      </div>
    </Fragment>
  );
};

EditPhotos.propTypes = {
  photo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentUserPhotos: PropTypes.func.isRequired,
  setPhotoAsMain: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  photo: state.photo,
  auth: state.auth,
});

const mapDispatchToProps = {
  getCurrentUserPhotos,
  setPhotoAsMain,
  deletePhoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPhotos);
