const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const isAuth = require('../middlewares/isAuth');
const {
  getPhotosOfCurrentUser,
  getPhotosByUserId,
  setPhotoAsMain,
  deletePhoto,
  uploadPhoto,
  uploadPhotos,
} = require('../controller/photo');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const exists = fs.existsSync(
      path.resolve(__dirname, '..', 'public', 'uploads', 'temp')
    );

    if (!exists) {
      fs.mkdirSync(`${__dirname}/../public/uploads/temp`, { recursive: true });
    }
    cb(null, 'public/uploads/temp');
  },
  filename: (req, file, cb) => {
    const name =
      Date.now() +
      '-' +
      file.originalname.toLocaleLowerCase().split(' ').join('-');
    cb(null, name);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png'
    ) {
      cb(null, true);
    } else {
      let err = new Error('Only image files are allowed!');
      err.type = 'multer-file-not-acceptable';
      cb(err);
    }
  },
});

// @route GET /api/photos
// @desc Get all photos of currently logged in user
// @access Public
router.get('/', isAuth, getPhotosOfCurrentUser);

// @route GET /api/photos/setmain
// @desc Set main photo of a user by photo path
// @access Private
router.get('/setmain', isAuth, setPhotoAsMain);

// @route DELETE /api/photos/delete
// @desc Delete photo of a user by photo path
// @access Private
router.delete('/delete', isAuth, deletePhoto);

// @route GET /api/photos/:user_id
// @desc Get all photos of a user by id
// @access Public
router.get('/:user_id', isAuth, getPhotosByUserId);

// @route POST /api/photos/upload/single
// @desc Upload single photo for current user
// @access Private
router.post('/upload/single', isAuth, upload.single('photo'), uploadPhoto);

// @route POST /api/photos/upload/multiple
// @desc Upload multiple photos for current user
// @access Private
router.post(
  '/upload/multiple',
  isAuth,
  upload.array('photos', 10),
  uploadPhotos
);

module.exports = router;
