const { users } = require('../../models');
const jwt = require('jsonwebtoken');
const jwtObj = require('../../config/jwt');

module.exports = {
  infoController: (req, res) => {
    let token = req.cookies.data;
    // console.log(token);

    let decoded = jwt.verify(token, jwtObj.secret);
    if (decoded) {
      users
        .findOne({ where: { id: decoded.id } })
        .then(data => {
          res.status(200).send('ok');
          res.end();
        })
        .catch(err => {
          res.status(401).send('need user token');
        });
    }
  },

  signInController: (req, res) => {
    const { email, password } = req.body;
    // console.log(jwtObj);
    users
      .findOne({ where: { email: email, password: password } })
      .then(data => {
        if (data) {
          let token = jwt.sign(
            {
              id: data.dataValues.id
            },
            jwtObj.secret,
            {
              expiresIn: '1d'
            }
          );

          res.cookie('data', token);
          // res.json({
          //   token: token
          // });
          res.status(200).end();
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },

  signUpController: (req, res) => {
    const { email, password, username, mobile } = req.body;
    console.log(email);
    console.log(password);
    console.log(username);
    console.log(mobile);
    users
      .findOrCreate({
        where: {
          email: email
        },
        defaults: {
          password: password,
          username: username,
          mobile: mobile
        }
      })
      .then(([results, created]) => {
        console.log('here!!!!!!!!!!!!!!!!!', created);
        if (!created) {
          // return res.status(409).send('email exists');
          return res.status(409).end();
        } else {
          res.status(200).end();
        }
        // const data = await users.get({ plain: true });
        // res.status(201).json(data);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
};
