require('dotenv').config();

const express = require('express');

const cors = require('cors');

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const mongoose = require('mongoose');

const PostRoutes = require('./routes/PostRoutes');

// declaring routes

app.use('/posts', PostRoutes);

app.use('/', (req, res) => {
  res.json('<h1>Backend server started successfully...</h1>');
});

app.listen(port, () => {
  console.log(`Server is running on : http://localhost:${port}`);
});

// connecting to mongoDB

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected Successfull...');
  })
  .catch((err) => {
    console.log(err);
  });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}
