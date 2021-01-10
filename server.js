require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

//express middlewares setup
app.use(express.json({ extended: false }));
app.use(cors());

//connect to db
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log('Error connecting to database!'));

//routes setup
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/like', require('./routes/like'));
app.use('/api/message', require('./routes/message'));
app.use('/api/photos', require('./routes/photo'));

//serve static assests in prod
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

//handle exception routes
app.use((req, res) => {
  res.status(404).json({
    errors: [
      {
        msg: "Sorry can't find that!",
      },
    ],
  });
});

//handle global errors
app.use((err, req, res, next) => {
  if (err) {
    console.error(err.message);
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        errors: [
          {
            msg: 'Sorry, you can upload images with max size 3MB only!',
          },
        ],
      });
    }

    if (err.type === 'multer-file-not-acceptable') {
      return res.status(400).json({
        errors: [
          {
            msg: 'Sorry, the file you uploaded is not supported!',
          },
        ],
      });
    }
    return res.status(500).json({
      errors: [
        {
          msg: 'Server error...',
        },
      ],
    });
  }
});

const PORT = process.env.PORT || 5000;

//start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
