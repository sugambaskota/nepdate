const router = require('express').Router();
const { check } = require('express-validator');

const isAuth = require('../middlewares/isAuth');
const {
  getMessages,
  sendMessage,
  getMessagesThread,
  getMessagesThreads,
} = require('../controller/message');

// @route GET /api/message
// @desc Get inbox or outbox container messages
// @access Private
router.get('/', isAuth, getMessages);

// @route GET /api/message/threads
// @desc Get messages threads
// @access Private
router.get('/threads', isAuth, getMessagesThreads);

// @route GET /api/message/thread/:user_id
// @desc Get message thread between current user and :user_id
// @access Private
router.get('/thread/:user_id', isAuth, getMessagesThread);

// @route POST /api/message/:receiver_id
// @desc Send message to receiver_id
// @access Private
router.post('/:receiver_id', isAuth, [
  check('text', 'Message text is required').not().isEmpty(),
  sendMessage,
]);

module.exports = router;
