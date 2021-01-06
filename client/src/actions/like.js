import axios from 'axios';

import { setAlert } from '../actions/alert';
import {
  SET_LIKE_LOADING,
  GET_LIKERS,
  GET_LIKED,
  LIKE_USER,
  UNLIKE_USER,
  LIKE_ERROR,
  CLEAR_LIKE,
} from './types';

export const likeUser = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await axios.get(`/api/like/${userId}`);
    dispatch(setAlert('User liked successfully!', 'success'));
    dispatch({
      type: LIKE_USER,
    });
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const unlikeUser = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await axios.get(`/api/like/not/${userId}`);
    dispatch(setAlert('User unliked successfully!', 'success'));
    dispatch({
      type: UNLIKE_USER,
    });
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getLikers = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearLike());
    const res = await axios.get('/api/like');
    dispatch({
      type: GET_LIKERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getLiked = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearLike());
    const res = await axios.get('/api/like/me');
    dispatch({
      type: GET_LIKED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

const setLoading = () => {
  return {
    type: SET_LIKE_LOADING,
  };
};

const clearLike = () => {
  return {
    type: CLEAR_LIKE,
  };
};
