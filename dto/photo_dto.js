const photoForOutDto = (photo) => {
  return {
    path: photo.path,
  };
};

const photosForOutDto = (photos) => {
  const photosForOut = photos.map((photo) => photoForOutDto(photo));
  return photosForOut;
};

module.exports = {
  photoForOutDto,
  photosForOutDto,
};
