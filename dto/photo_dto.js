const photosForOutDto = (photos, publicPath) => {
  const photosForOut = photos.map((photo) => {
    return {
      path: publicPath + photo.name,
    };
  });
  return photosForOut;
};

module.exports = {
  photosForOutDto,
};
