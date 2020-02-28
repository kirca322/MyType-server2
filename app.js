const express = require('express');
const bodyParser = require('body-parser');

var sequelize = require('./models').sequelize;
sequelize.sync();

const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user'); // 라우트의 유저파일을 이용합니다.
const linksRouter = require('./routes/links'); // 라우트의 링크파일을 이용합니다.

const app = express();
const port = 3001;

app.use(
  session({
    secret: '@kgb',
    resave: false,
    saveUninitialized: true
  })
);
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
app.use('/videos', linksRouter);

app.listen(port, () => {
  console.log(`app is listening in PORT ${port}`);
});

module.exports = app;
