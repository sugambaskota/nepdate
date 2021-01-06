import {
  SET_MESSAGE_LOADING,
  GET_MESSAGES,
  GET_MESSAGE_THREAD,
  SEND_MESSAGE,
  MESSAGES_ERROR,
  CLEAR_MESSAGES,
} from '../actions/types';

const initialState = {
  messages: null,
  thread: null,
  pagination: null,
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: null,
        thread: null,
        pagination: null,
      };
    case GET_MESSAGES:
      return {
        ...state,
        loading: false,
        messages: payload.data,
        pagination: JSON.parse(payload.headers.pagination),
      };
    case GET_MESSAGE_THREAD:
      return {
        ...state,
        loading: false,
        thread: payload,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        loading: false,
        thread: [...state.thread, payload],
      };
    case MESSAGES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
