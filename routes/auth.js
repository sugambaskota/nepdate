const router = require('express').Router();
const { check } = require('express-validator');

const isAuth = require('../middlewares/isAuth');
const {
  getCurrentUser,
  loginUser,
  updateCurrentUser,
} = require('../controller/auth');

// @route GET /api/auth
// @desc Get currently logged in user
// @access Private
router.get('/', isAuth, getCurrentUser);

// @route POST /api/auth
// @desc Login user
// @access Public
router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  loginUser
);

// @route PUT /api/auth
// @desc Update current user details
// @access Private
router.put(
  '/',
  isAuth,
  [
    check('firstname', 'First name is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
  ],
  updateCurrentUser
);

module.exports = router;
