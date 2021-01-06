import {
  SET_USERS_LOADING,
  GET_USERS,
  SEARCH_USERS,
  USERS_ERROR,
  CLEAR_USERS,
} from '../actions/types';

const initialState = {
  users: null,
  pagination: null,
  searchResult: null,
  searchPagination: null,
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: null,
        pagination: null,
        searchResult: null,
        searchPagination: null,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload.data,
        pagination: JSON.parse(payload.headers.pagination),
        loading: false,
      };
    case SEARCH_USERS:
      return {
        ...state,
        searchResult: payload.data,
        searchPagination: JSON.parse(payload.headers.pagination),
        loading: false,
      };
    case USERS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
