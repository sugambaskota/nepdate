require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

//express middlewares setup
app.use(express.json({ extended: false }));

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

//setup static directory
app.use(express.static(path.resolve(__dirname, 'public')));

//routes setup
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/like', require('./routes/like'));
app.use('/api/message', require('./routes/message'));
app.use('/api/photos', require('./routes/photo'));
app.use((req, res) => {
  res.status(404).json({
    errors: [
      {
        msg: "Sorry can't find that!",
      },
    ],
  });
});
app.use((err, req, res, next) => {
  if (err) {
    console.error(err.message);
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

//start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}!`);
});
