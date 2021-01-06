import axios from 'axios';

import { setAlert } from './alert';
import {
  SET_PHOTO_LOADING,
  GET_PHOTOS,
  SET_PHOTO_MAIN,
  DELETE_PHOTO,
  PHOTOS_ERROR,
  CLEAR_PHOTOS,
} from './types';

export const getCurrentUserPhotos = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearPhotos());
    const res = await axios.get('/api/photos');
    dispatch({
      type: GET_PHOTOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PHOTOS_ERROR,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getPhotosByUserId = (user_id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearPhotos());
    const res = await axios.get(`/api/photos/${user_id}`);
    dispatch({
      type: GET_PHOTOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PHOTOS_ERROR,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const setPhotoAsMain = (photo_path) => async (dispatch) => {
  try {
    await axios.get(`/api/photos/setmain?path=${photo_path}`);
    dispatch({
      type: SET_PHOTO_MAIN,
      payload: photo_path,
    });
    dispatch(setAlert('Main photo updated successfully!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const deletePhoto = (photo_path) => async (dispatch) => {
  try {
    await axios.delete(`/api/photos/delete?path=${photo_path}`);

    dispatch({
      type: DELETE_PHOTO,
      payload: photo_path,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const uploadPhotos = (photos) => async (dispatch) => {
  try {
    dispatch(setLoading());

    let formData = new FormData();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    photos.forEach((photo) => formData.append('photos', photo));
    const res = await axios.post(
      '/api/photos/upload/multiple',
      formData,
      config
    );
    dispatch({
      type: GET_PHOTOS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

const setLoading = () => {
  return {
    type: SET_PHOTO_LOADING,
  };
};

const clearPhotos = () => {
  return {
    type: CLEAR_PHOTOS,
  };
};
