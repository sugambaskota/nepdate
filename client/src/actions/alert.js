import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const newAlert = {
    id: uuidv4(),
    msg: msg,
    alertType: alertType,
  };

  dispatch({
    type: SET_ALERT,
    payload: newAlert,
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: newAlert.id,
    });
  }, timeout);
};
