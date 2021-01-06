const router = require('express').Router();
const { check } = require('express-validator');

const isAuth = require('../middlewares/isAuth');
const {
  registerUser,
  getUser,
  getUsers,
  searchUsers,
} = require('../controller/users');

// @route GET /api/users
// @desc Get all users
// @access Private
router.get('/', isAuth, getUsers);

// @route Get /api/users/search
// @desc Search users
// @access Private
router.get('/search', isAuth, searchUsers);

// @route GET /api/users/:user_id
// @desc Get user by id
// @access Private
router.get('/:user_id', isAuth, getUser);

// @route POST /api/users
// @desc Register user
// @access Public
router.post(
  '/',
  [
    check('firstname', 'First name is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  registerUser
);

module.exports = router;
