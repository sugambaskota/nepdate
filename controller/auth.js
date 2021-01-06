const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/User');
const getPublicPath = require('../utils/getPublicPath');
const { userForOutDto } = require('../dto/user_dto');

const getCurrentUser = async (req, res) => {
  try {
    let user = userForOutDto(req.user, getPublicPath(req));
    res.json({
      user,
    });
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

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Invalid credentials',
          },
        ],
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Invalid credentials',
          },
        ],
      });
    }

    await User.findByIdAndUpdate(user._id, {
      lastactive: Date.now(),
    });

    const token = jwt.sign(
      {
        user: {
          id: user._id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
    });
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

const updateCurrentUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, middlename, lastname, gender, dob } = req.body;
    await User.findByIdAndUpdate(req.user._id, {
      firstname: firstname.toLowerCase(),
      middlename: middlename ? middlename.toLowerCase() : '',
      lastname: lastname.toLowerCase(),
      gender: gender.toLowerCase(),
      dob,
    });

    let user = await User.findById(req.user._id);

    let userForOut = userForOutDto(user, getPublicPath(req));
    res.json({
      user: userForOut,
    });
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
  getCurrentUser,
  loginUser,
  updateCurrentUser,
};
