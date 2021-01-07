const Photo = require('../models/Photo');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const { photosForOutDto } = require('../dto/photo_dto');

const getPhotosOfCurrentUser = async (req, res) => {
  try {
    const photos = await Photo.find({
      owner: req.user.id,
    });
    let photosForOut = photosForOutDto(photos);
    res.json(photosForOut);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [
        {
          msg: 'Server error...',
        },
      ],
    });
  }
};

const getPhotosByUserId = async (req, res) => {
  try {
    const photos = await Photo.find({
      owner: req.params.user_id,
    });
    let photosForOut = photosForOutDto(photos);
    res.json(photosForOut);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [
        {
          msg: 'Server error...',
        },
      ],
    });
  }
};

const setPhotoAsMain = async (req, res) => {
  try {
    const photoPath = req.query.path;
    await User.findByIdAndUpdate(req.user.id, {
      dp: photoPath,
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [
        {
          msg: 'Server error...',
        },
      ],
    });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const photoPath = req.query.path;
    if (req.user.dp === photoPath) {
      return res.status(400).json({
        errors: [
          {
            msg: "Photo not deleted as it's your current main photo!",
          },
        ],
      });
    }

    await Photo.deleteOne({
      path: photoPath,
    });

    // delete photo from cloudinary
    let photoName = photoPath.split('/');
    photoName = photoName[photoName.length - 1];
    let publicId = photoName.slice(0, -4);
    cloudinary.uploader.destroy(publicId, (error, result) => {
      res.sendStatus(200);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [
        {
          msg: 'Server error...',
        },
      ],
    });
  }
};

const uploadPhoto = async (req, res) => {
  try {
    if (req.file) {
      const { path } = req.file;
      const photo = new Photo({
        owner: req.user._id,
        path,
      });
      await photo.save();
      const photos = await Photo.find({
        owner: req.user.id,
      });
      let photosForOut = photosForOutDto(photos);
      res.json(photosForOut);
    } else {
      res.status(400).json({
        errors: [
          {
            msg: 'File not received by server',
          },
        ],
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [
        {
          msg: 'Server error...',
        },
      ],
    });
  }
};

const uploadPhotos = async (req, res) => {
  try {
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const { path } = file;
        const photo = new Photo({
          owner: req.user.id,
          path,
        });
        await photo.save();
      }
      const photos = await Photo.find({
        owner: req.user.id,
      });
      let photosForOut = photosForOutDto(photos);
      res.json(photosForOut);
    } else {
      res.status(400).json({
        errors: [
          {
            msg: 'Files not received by server',
          },
        ],
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [
        {
          msg: 'Server error...',
        },
      ],
    });
  }
};

module.exports = {
  getPhotosOfCurrentUser,
  getPhotosByUserId,
  setPhotoAsMain,
  deletePhoto,
  uploadPhoto,
  uploadPhotos,
};
