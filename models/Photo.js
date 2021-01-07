const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  path: {
    type: String,
    required: true,
  },
});

module.exports = Photo = mongoose.model('photo', PhotoSchema);
