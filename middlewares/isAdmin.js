const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.user.role === 'admin') {
    return next();
  } else {
    return res.status(401).json({
      errors: [
        {
          msg: 'Authorization denied',
        },
      ],
    });
  }
};
