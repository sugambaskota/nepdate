import {
  SET_PHOTO_LOADING,
  GET_PHOTOS,
  DELETE_PHOTO,
  PHOTOS_ERROR,
  CLEAR_PHOTOS,
} from '../actions/types';

const initialState = {
  photos: null,
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PHOTO_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_PHOTOS:
      return {
        ...state,
        photos: null,
      };
    case GET_PHOTOS:
      return {
        ...state,
        loading: false,
        photos: payload,
      };
    case DELETE_PHOTO:
      return {
        ...state,
        loading: false,
        photos: state.photos.filter((photo) => photo.path !== payload),
      };
    case PHOTOS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
