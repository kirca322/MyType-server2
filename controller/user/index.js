const { users } = require('../../models');

module.exports = {
  signInController: (req, res) => {
    const { email, password } = req.body;

    users
      .findOne({ where: { email: email, password: password } })
      .then(data => {
        if (data === null) {
          res.status(404).send('unvalid user');
        } else {
          res.status(200).json(data.dataValues);
        }
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  signOutController: (req, res) => {
    res.redirect('/');
    res.end();
  },
  signUpController: (req, res) => {
    const { email, password, username, mobile } = req.body;

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
      .then(async ([user, created]) => {
        if (!created) {
          return res.status(409).send('email exists');
        }
        const data = await users.get({ plain: true }); // 해당 인스턴스의 데이터만 가져오기
        res.status(201).json(data);
      });
  }
};
