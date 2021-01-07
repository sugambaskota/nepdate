const photosForOutDto = (photos) => {
  const photosForOut = photos.map((photo) => {
    return {
      path: photo.path,
    };
  });
  return photosForOut;
};

module.exports = {
  photosForOutDto,
};
