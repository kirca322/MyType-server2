const express = require('express');
const bodyParser = require('body-parser');

var sequelize = require('./models').sequelize;
sequelize.sync();

const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user');
const videosRouter = require('./routes/videos');

const app = express();
const port = 3001;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      'http://my-type.s3-website.ap-northeast-2.amazonaws.com',
      'http://localhost:3000'
    ],
    methods: ['GET', 'POST'],
    credentials: true
  })
);

app.use('/user', userRouter);
app.use('/videos', videosRouter);

app.listen(port, () => {
  console.log(`app is listening in PORT ${port}`);
});

module.exports = app;
