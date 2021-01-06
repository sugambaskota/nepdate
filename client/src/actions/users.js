import axios from 'axios';

import { setAlert } from '../actions/alert';
import {
  SET_USERS_LOADING,
  GET_USERS,
  SEARCH_USERS,
  USERS_ERROR,
  CLEAR_USERS,
} from './types';

export const getUsers = (page = 1, size = 6) => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearUsers());
    const queryParams = `?page=${page}&size=${size}`;

    const res = await axios.get(`/api/users${queryParams}`);
    dispatch({
      type: GET_USERS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const searchUsers = (query, page = 1, size = 3) => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearUsers());
    const queryParams = `?q=${query}&page=${page}&size=${size}`;
    const res = await axios.get(`/api/users/search${queryParams}`);
    dispatch({
      type: SEARCH_USERS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

const setLoading = () => {
  return {
    type: SET_USERS_LOADING,
  };
};

const clearUsers = () => {
  return {
    type: CLEAR_USERS,
  };
};
