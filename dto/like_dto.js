const { userForOutDto } = require('./user_dto');

const likeForOutDto = (likes, likerCase, publicPath) => {
  let likeForOut = [];
  if (likerCase) {
    likeForOut = likes.map((like) => userForOutDto(like.liker, publicPath));
  } else {
    likeForOut = likes.map((like) => userForOutDto(like.likee, publicPath));
  }
  return likeForOut;
};

module.exports = {
  likeForOutDto,
};
