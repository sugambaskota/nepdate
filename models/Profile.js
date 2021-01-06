const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  description: {
    type: String,
  },
  lookingfor: {
    type: String,
  },
  interest: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
