const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// const userRouter = require(); // 로그인 경로 ex) ./routes/user
// const linksRouter = require(); // 링크 경로 ex) ./routes/links

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
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  })
);
app.use('/', (req, res) => res.send('Hello World'));

// app.use('', userRouter); // 로그인 경로 설정 시 경로 적어주기 ex) /user
// app.use('', linksRouter); // 링크 경로 설정 시 경로 적어주기 ex) /links

app.listen(port, () => {
  console.log(`app is listening in PORT ${port}`);
});

module.exports = app;
