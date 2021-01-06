const router = require('express').Router();
const { check } = require('express-validator');

const isAuth = require('../middlewares/isAuth');
const {
  getCurrentUserProfile,
  getProfileByUserId,
  upsertProfile,
} = require('../controller/profile');

// @route GET /api/profile
// @desc Get currently logged in user's profile
// @access Private
router.get('/', isAuth, getCurrentUserProfile);

// @route GET /api/profile/:user_id
// @desc Get currently a user's profile by user_id
// @access Public
router.get('/:user_id', isAuth, getProfileByUserId);

// @route POST /api/profile
// @desc Create or update profile for currently logged in user
// @access Private
router.post(
  '/',
  isAuth,
  [
    check('description', 'Description is required').not().isEmpty(),
    check('lookingfor', 'Looking for is required').not().isEmpty(),
    check('interest', 'Interest is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('country', 'Country is required').not().isEmpty(),
  ],
  upsertProfile
);

module.exports = router;
