const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const Photo = require('../models/Photo');
const User = require('../models/User');
const getPublicPath = require('../utils/getPublicPath');
const { photosForOutDto } = require('../dto/photo_dto');

const getPhotosOfCurrentUser = async (req, res) => {
  try {
    const photos = await Photo.find({
      owner: req.user.id,
    });
    let photosForOut = photosForOutDto(photos, getPublicPath(req));
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
    let photosForOut = photosForOutDto(photos, getPublicPath(req));
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
    const photoName = photoPath.replace(getPublicPath(req), '');
    const exists = fs.existsSync(
      path.resolve(__dirname, '..', 'public', 'uploads', photoName)
    );
    if (!exists) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Photo not found!',
          },
        ],
      });
    }
    await User.findByIdAndUpdate(req.user.id, {
      dp: photoName,
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
    const photoName = photoPath.replace(getPublicPath(req), '');
    if (req.user.dp === photoName) {
      return res.status(400).json({
        errors: [
          {
            msg: "Photo not deleted as it's your current main photo!",
          },
        ],
      });
    }
    const exists = fs.existsSync(
      path.resolve(__dirname, '..', 'public', 'uploads', photoName)
    );
    if (!exists) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Photo not found!',
          },
        ],
      });
    }
    await Photo.deleteOne({
      name: photoName,
    });
    fs.unlinkSync(
      path.resolve(__dirname, '..', 'public', 'uploads', photoName)
    );
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

const uploadPhoto = async (req, res) => {
  try {
    if (req.file) {
      const { filename } = req.file;
      await sharp(req.file.path)
        .rotate()
        .resize(800, 800)
        .toFile(path.resolve(req.file.destination, '..', filename));
      fs.unlinkSync(req.file.path);
      const photo = new Photo({
        owner: req.user._id,
        name: filename,
      });
      await photo.save();
      const photos = await Photo.find({
        owner: req.user.id,
      });
      let photosForOut = photosForOutDto(photos, getPublicPath(req));
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
        const { filename } = file;
        await sharp(file.path)
          .rotate()
          .resize(800, 800)
          .toFile(path.resolve(file.destination, '..', filename));
        fs.unlinkSync(file.path);
        const photo = new Photo({
          owner: req.user.id,
          name: filename,
        });
        await photo.save();
      }
      const photos = await Photo.find({
        owner: req.user.id,
      });
      let photosForOut = photosForOutDto(photos, getPublicPath(req));
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
