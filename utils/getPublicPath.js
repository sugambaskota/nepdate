const getPublicPath = (req) => {
  if (req) {
    return `${req.protocol}://${req.get('host')}/uploads/`;
  } else {
    return;
  }
};

module.exports = getPublicPath;
