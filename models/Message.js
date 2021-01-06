const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  conversation_id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isread: {
    type: Boolean,
    default: false,
  },
  dateread: {
    type: Date,
  },
  senderdeleted: {
    type: Boolean,
    default: false,
  },
  receiverdeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = Message = mongoose.model('message', MessageSchema);
