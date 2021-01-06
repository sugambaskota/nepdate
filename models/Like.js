const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  liker: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  likee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

module.exports = Like = mongoose.model("like", LikeSchema);
