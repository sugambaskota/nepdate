const { userForOutDto } = require('./user_dto');

const likeForOutDto = (likes, likerCase) => {
  let likeForOut = [];
  if (likerCase) {
    likeForOut = likes.map((like) => userForOutDto(like.liker));
  } else {
    likeForOut = likes.map((like) => userForOutDto(like.likee));
  }
  return likeForOut;
};

module.exports = {
  likeForOutDto,
};
