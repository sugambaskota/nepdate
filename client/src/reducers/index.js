import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import profile from './profile';
import users from './users';
import photo from './photo';
import message from './message';
import like from './like';

export default combineReducers({
  alert,
  auth,
  profile,
  users,
  photo,
  message,
  like,
});
