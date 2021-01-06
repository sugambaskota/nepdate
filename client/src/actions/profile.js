import axios from 'axios';

import { setAlert } from '../actions/alert';

import {
  SET_PROFILE_LOADING,
  GET_PROFILE,
  NO_PROFILE_FOUND,
  PROFILE_ERROR,
  CLEAR_PROFILE,
} from './types';

export const getCurrentUserProfile = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearProfile());
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    if (err.response.status === 404) {
      return dispatch({
        type: NO_PROFILE_FOUND,
      });
    }

    dispatch({
      type: PROFILE_ERROR,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getProfileByUserId = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearProfile());
    const res = await axios.get(`/api/profile/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    if (err.response.status === 404) {
      return dispatch({
        type: NO_PROFILE_FOUND,
      });
    }
    dispatch({
      type: PROFILE_ERROR,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const createProfile = (formData, history) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(formData);

    await axios.post('/api/profile', body, config);

    history.push('/profile');

    dispatch(setAlert('Profile created successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const updateProfile = (formData, history) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(formData);

    await axios.post('/api/profile', body, config);

    history.push('/profile');

    dispatch(setAlert('Profile updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

const setLoading = () => {
  return {
    type: SET_PROFILE_LOADING,
  };
};

const clearProfile = () => {
  return {
    type: CLEAR_PROFILE,
  };
};
