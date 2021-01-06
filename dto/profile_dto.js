const { userForOutDto } = require('./user_dto');
const { photosForOutDto } = require('./photo_dto');

const profileForOutDto = (profile, publicPath) => {
  return {
    id: profile._id,
    description: profile.description ? profile.description : '',
    lookingfor: profile.lookingfor ? profile.lookingfor : '',
    interest: profile.interest ? profile.interest : '',
    city: profile.city ? profile.city : '',
    country: profile.country ? profile.country : '',
    user: userForOutDto(profile.user, publicPath),
    photos: photosForOutDto(profile.photos, publicPath),
    liked: profile.liked ? true : false,
  };
};

module.exports = {
  profileForOutDto,
};
