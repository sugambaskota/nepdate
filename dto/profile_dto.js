const { userForOutDto } = require('./user_dto');
const { photosForOutDto } = require('./photo_dto');

const profileForOutDto = (profile) => {
  return {
    id: profile._id,
    description: profile.description ? profile.description : '',
    lookingfor: profile.lookingfor ? profile.lookingfor : '',
    interest: profile.interest ? profile.interest : '',
    city: profile.city ? profile.city : '',
    country: profile.country ? profile.country : '',
    user: userForOutDto(profile.user),
    photos: photosForOutDto(profile.photos),
    liked: profile.liked ? true : false,
  };
};

module.exports = {
  profileForOutDto,
};
