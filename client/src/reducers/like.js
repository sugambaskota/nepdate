import {
  SET_LIKE_LOADING,
  GET_LIKERS,
  GET_LIKED,
  LIKE_ERROR,
  CLEAR_LIKE,
  LIKE_USER,
  UNLIKE_USER,
} from '../actions/types';

const initialState = {
  likers: null,
  liked: null,
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LIKE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_LIKE:
      return {
        ...state,
        likers: null,
        liked: null,
      };
    case GET_LIKERS:
      return {
        ...state,
        loading: false,
        likers: payload,
      };
    case GET_LIKED:
      return {
        ...state,
        loading: false,
        liked: payload,
      };
    case LIKE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case LIKE_USER:
    case UNLIKE_USER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
