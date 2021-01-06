const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = async function (req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: [
        {
          msg: 'No token, authorization denied',
        },
      ],
    });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(404).json({
        errors: [
          {
            msg: 'User not found!',
          },
        ],
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(419).json({
      errors: [
        {
          msg: 'Token is not valid',
        },
      ],
    });
  }
};
