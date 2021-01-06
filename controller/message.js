const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const Message = require('../models/Message');
const Like = require('../models/Like');
const getPublicPath = require('../utils/getPublicPath');
const { messageForOutDto, messagesForOutDto } = require('../dto/message_dto');

exports.getMessages = async (req, res) => {
  try {
    let boxtype = '';
    req.query.container === 'outbox'
      ? (boxtype = 'outbox')
      : (boxtype = 'inbox');
    if (boxtype === 'outbox') {
      let messages = await Message.find({
        sender: req.user.id,
      })
        .populate('sender')
        .populate('receiver');
      const messagesForOut = messagesForOutDto(messages, getPublicPath(req));
      return res.json(messagesForOut);
    }
    let messages = await Message.find({
      receiver: req.user.id,
    })
      .populate('sender')
      .populate('receiver');
    const messagesForOut = messagesForOutDto(messages, getPublicPath(req));
    res.json(messagesForOut);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [
        {
          msg: 'Server error...',
        },
      ],
    });
  }
};

exports.getMessagesThread = async (req, res) => {
  try {
    const otherUserId = req.params.user_id;
    let thread = await Message.find({
      sender: {
        $in: [req.user.id, otherUserId],
      },
      receiver: {
        $in: [req.user.id, otherUserId],
      },
    })
      .sort({ date: 1 })
      .populate('sender')
      .populate('receiver');
    const threadForOut = messagesForOutDto(thread, getPublicPath(req));
    res.json(threadForOut);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [
        {
          msg: 'Server error...',
        },
      ],
    });
  }
};

exports.getMessagesThreads = async (req, res) => {
  try {
    let currentPage = +req.query.page || 1;
    let pageSize =
      !req.query.size || +req.query.size > 5 || +req.query.size < 1
        ? 5
        : +req.query.size;
    const threads = await Message.aggregate([
      {
        $match: {
          $or: [
            {
              sender: mongoose.Types.ObjectId(req.user.id),
            },
            {
              receiver: mongoose.Types.ObjectId(req.user.id),
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'sender',
          foreignField: '_id',
          as: 'from',
        },
      },
      {
        $unwind: '$from',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'receiver',
          foreignField: '_id',
          as: 'to',
        },
      },
      {
        $unwind: '$to',
      },
      {
        $group: {
          _id: '$conversation_id',
          sender: { $last: '$from' },
          receiver: { $last: '$to' },
          text: { $last: '$text' },
          date: { $last: '$date' },
          isread: { $last: '$isread' },
          dateread: { $last: '$dateread' },
        },
      },
      {
        $sort: {
          date: -1,
        },
      },
      {
        $skip: (currentPage - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },
    ]);
    const forCount = await Message.aggregate([
      {
        $match: {
          $or: [
            {
              sender: mongoose.Types.ObjectId(req.user.id),
            },
            {
              receiver: mongoose.Types.ObjectId(req.user.id),
            },
          ],
        },
      },
      {
        $group: {
          _id: '$conversation_id',
        },
      },
      {
        $count: 'count',
      },
    ]);
    const totalCount = forCount && forCount.length > 0 ? forCount[0].count : 0;
    let totalPages = Math.ceil(totalCount / pageSize);
    let paginationInfo = JSON.stringify({
      currentPage,
      pageSize,
      totalPages,
      totalCount,
    });
    const threadsForOut = messagesForOutDto(threads, getPublicPath(req));
    res.setHeader('Pagination', paginationInfo);

    res.json(threadsForOut);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      errors: [
        {
          msg: 'Server error...',
        },
      ],
    });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const likeCheck = await Like.find({
      liker: {
        $in: [req.user._id.toString(), req.params.receiver_id],
      },
      likee: {
        $in: [req.user._id.toString(), req.params.receiver_id],
      },
    });

    if (!likeCheck || likeCheck.length < 2) {
      return res.status(400).json({
        errors: [
          {
            msg:
              "Message could not be sent as you haven't liked the user or the user has not liked you",
          },
        ],
      });
    }

    const { text } = req.body;
    const receiver = req.params.receiver_id;
    const conversation_id = [req.user.id, receiver].sort().join('.');

    const message = new Message({
      sender: req.user.id,
      receiver,
      conversation_id,
      text,
    });

    await message.save();

    const newMessage = await Message.findById(message._id)
      .populate('sender')
      .populate('receiver');

    const messageForOut = messageForOutDto(newMessage, getPublicPath(req));

    res.json(messageForOut);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [
        {
          msg: 'Server error...',
        },
      ],
    });
  }
};
