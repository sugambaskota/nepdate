import axios from "axios";

import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import socket from "../utils/socket";
import {
  SET_AUTH_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  UPDATE_USER,
  AUTH_ERROR,
  CLEAR_AUTH,
  LOGOUT,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    dispatch(setLoading());
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    socket.emit("online", res.data.user.id);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({
  firstname,
  middlename,
  lastname,
  gender,
  dob,
  email,
  password,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    firstname,
    middlename,
    lastname,
    gender,
    dob,
    email,
    password,
  });

  try {
    dispatch(setLoading());
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    dispatch(setLoading());
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Update user details
export const updateUser = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      firstname: formData.fname,
      middlename: formData.mname,
      lastname: formData.lname,
      gender: formData.gender,
      dob: formData.dob,
    });

    dispatch(setLoading());
    const res = await axios.put("/api/auth", body, config);

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });

    history.push("/profile");

    dispatch(setAlert("Details updated successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch(clearAuth());
  dispatch({
    type: LOGOUT,
  });
  socket.disconnect();
};

// Set loading
const setLoading = () => {
  return {
    type: SET_AUTH_LOADING,
  };
};

// Clear auth
const clearAuth = () => {
  return {
    type: CLEAR_AUTH,
  };
};
