const Like = require('../models/Like');
const { likeForOutDto } = require('../dto/like_dto');

exports.getLikers = async (req, res) => {
  try {
    const likes = await Like.find({
      likee: req.user.id,
    }).populate('liker');
    let likeForOut = likeForOutDto(likes, true);
    res.json(likeForOut);
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

exports.getLiked = async (req, res) => {
  try {
    const likes = await Like.find({
      liker: req.user.id,
    }).populate('likee');
    let likeForOut = likeForOutDto(likes, false);
    res.json(likeForOut);
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

exports.likeUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.user_id) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Sorry, you cannot like yourself!',
          },
        ],
      });
    }
    let like = await Like.findOne({
      liker: req.user._id,
      likee: req.params.user_id,
    });

    if (like) {
      return res.status(400).json({
        errors: [
          {
            msg: 'User already liked',
          },
        ],
      });
    }
    like = new Like({
      liker: req.user._id,
      likee: req.params.user_id,
    });

    await like.save();
    res.sendStatus(200);
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

exports.unlikeUser = async (req, res) => {
  try {
    let like = await Like.findOne({
      liker: req.user._id,
      likee: req.params.user_id,
    });

    if (!like) {
      return res.status(400).json({
        errors: [
          {
            msg: 'User not liked',
          },
        ],
      });
    }

    await like.remove();
    res.sendStatus(200);
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
