const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const {
  getLikers,
  getLiked,
  likeUser,
  unlikeUser,
} = require('../controller/like');

// @route Get /api/like
// @desc Get all users who like current user
// @access Private
router.get('/', isAuth, getLikers);

// @route Get /api/like/me
// @desc Get all users whom current user like
// @access Private
router.get('/me', isAuth, getLiked);

// @route GET /api/like/:user_id
// @desc Like user by id
// @access Private
router.get('/:user_id', isAuth, likeUser);

// @route GET /api/like/not/:user_id
// @desc Unlike user by id
// @access Private
router.get('/not/:user_id', isAuth, unlikeUser);

module.exports = router;
