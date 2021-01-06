import {
  SET_PROFILE_LOADING,
  GET_PROFILE,
  NO_PROFILE_FOUND,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  SET_PHOTO_MAIN,
  LIKE_USER,
  UNLIKE_USER,
} from '../actions/types';

const initialState = {
  profile: null,
  notfound: false,
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        notfound: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case NO_PROFILE_FOUND:
      return {
        ...state,
        profile: null,
        notfound: true,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case SET_PHOTO_MAIN:
      return {
        ...state,
        profile: {
          ...state.profile,
          user: {
            ...state.profile.user,
            dp: payload,
          },
        },
      };
    case LIKE_USER:
      return {
        ...state,
        profile: {
          ...state.profile,
          liked: true,
        },
      };
    case UNLIKE_USER:
      return {
        ...state,
        profile: {
          ...state.profile,
          liked: false,
        },
      };
    default:
      return state;
  }
}
