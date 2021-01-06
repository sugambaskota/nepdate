const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.user.role === 'superadmin') {
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
