const { validationResult } = require('express-validator');

const Profile = require('../models/Profile');
const Photo = require('../models/Photo');
const Like = require('../models/Like');
const { profileForOutDto } = require('../dto/profile_dto');

const getCurrentUserProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user');

    if (!profile) {
      return res.status(404).json({
        errors: [
          {
            msg: 'No profile found!',
          },
        ],
      });
    }
    profile.photos = await Photo.find({
      owner: req.user.id,
    });
    let profileForOut = profileForOutDto(profile);
    res.json(profileForOut);
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

const getProfileByUserId = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.user_id) {
      return res.status(404).json({
        errors: [
          {
            msg: 'Profile not found!',
          },
        ],
      });
    }

    let profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user');

    if (!profile) {
      return res.status(404).json({
        errors: [
          {
            msg: 'Profile not found!',
          },
        ],
      });
    }

    const liked = await Like.findOne({
      liker: req.user._id,
      likee: req.params.user_id,
    });

    if (liked) {
      profile.liked = true;
    } else {
      profile.liked = false;
    }

    profile.photos = await Photo.find({
      owner: req.params.user_id,
    });

    let profileForOut = profileForOutDto(profile);
    res.json(profileForOut);
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

const upsertProfile = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, lookingfor, interest, city, country } = req.body;

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        {
          user: req.user.id,
        },
        {
          description,
          lookingfor,
          interest,
          city: city.toLowerCase(),
          country: country.toLowerCase(),
        }
      );
      return res.sendStatus(200);
    }

    // Create profile if not exists
    profile = new Profile({
      user: req.user.id,
      description,
      lookingfor,
      interest,
      city: city.toLowerCase(),
      country: country.toLowerCase(),
    });

    await profile.save();

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

module.exports = {
  getCurrentUserProfile,
  getProfileByUserId,
  upsertProfile,
};
