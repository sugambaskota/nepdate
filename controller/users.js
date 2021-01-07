const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/User');
const { userForOutDto, usersForOutDto } = require('../dto/user_dto');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    let userForOut = userForOutDto(user);
    res.json(userForOut);
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

exports.getUsers = async (req, res) => {
  try {
    let currentPage = +req.query.page || 1;
    let pageSize =
      !req.query.size || +req.query.size > 6 || +req.query.size < 1
        ? 6
        : +req.query.size;
    const users = await User.find({
      _id: {
        $ne: req.user.id,
      },
      gender: {
        $ne: req.user.gender,
      },
    })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    let totalCount = await User.countDocuments({
      _id: {
        $ne: req.user.id,
      },
      gender: {
        $ne: req.user.gender,
      },
    });
    let totalPages = Math.ceil(totalCount / pageSize);

    let paginationInfo = JSON.stringify({
      currentPage,
      pageSize,
      totalPages,
      totalCount,
    });
    let usersForOut = usersForOutDto(users);
    res.setHeader('Pagination', paginationInfo);
    res.json(usersForOut);
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

exports.searchUsers = async (req, res) => {
  try {
    let q = req.query.q;

    if (!q || q.length < 1) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Search query is empty',
          },
        ],
      });
    }
    let currentPage = +req.query.page || 1;
    let pageSize =
      !req.query.size || +req.query.size > 3 || +req.query.size < 1
        ? 3
        : +req.query.size;

    const users = await User.find({
      _id: {
        $ne: req.user._id,
      },
      $or: [
        {
          firstname: {
            $regex: q,
            $options: 'i',
          },
        },
        {
          lastname: {
            $regex: q,
            $options: 'i',
          },
        },
      ],
    })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    let totalCount = await User.countDocuments({
      _id: {
        $ne: req.user._id,
      },
      $or: [
        {
          firstname: {
            $regex: q,
            $options: 'i',
          },
        },
        {
          lastname: {
            $regex: q,
            $options: 'i',
          },
        },
      ],
    });

    let totalPages = Math.ceil(totalCount / pageSize);

    let paginationInfo = JSON.stringify({
      currentPage,
      pageSize,
      totalPages,
      totalCount,
    });

    let usersForOut = usersForOutDto(users);
    res.setHeader('Pagination', paginationInfo);
    res.json(usersForOut);
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

exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstname,
      middlename,
      lastname,
      gender,
      dob,
      email,
      password,
    } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
      firstname: firstname.toLowerCase(),
      middlename: middlename ? middlename.toLowerCase() : '',
      lastname: lastname.toLowerCase(),
      gender: gender.toLowerCase(),
      dob,
      email: email.toLowerCase(),
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = jwt.sign(
      {
        user: {
          id: user._id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ token });
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
