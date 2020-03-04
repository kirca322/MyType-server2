const { users } = require('../../models');
const { categories } = require('../../models');
const { users_categories } = require('../../models');
const { users_categories_videos } = require('../../models');

const jwt = require('jsonwebtoken');
const jwtObj = require('../../config/jwt');

module.exports = {
  categoryListController: (req, res) => {
    let token = JSON.parse(req.headers.authorization);
    jwt.verify(token, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log(err);
      }
      if (decoded) {
        users_categories
          .findAll({ where: { users_id: decoded.id } })
          .then(data => {
            if (data) {
              let checkList = []; // 유저 카테고리 리스트 번호
              for (let i = 0; i < data.length; i++) {
                let chk = data[i].dataValues;
                checkList.push(chk.categories_id);
              }
              if (checkList.length === 0) {
                res.status(204).json({ userCategoryList: result });
              } else {
                categories.findAll({ where: { id: checkList } }).then(data => {
                  let result = [];
                  for (let i = 0; i < data.length; i++) {
                    let chk = data[i].dataValues.category_name;
                    result.push(chk);
                  }
                  if (result.length > 0) {
                    res.status(200).json({ userCategoryList: result });
                  }
                });
              }
            } else {
              res.status(409).end();
            }
          })
          .catch(err => {
            res.status(404).send(err);
          });
      } else {
        res.status(401).end();
      }
    });
  },
  signInController: (req, res) => {
    const { email, password } = req.body;
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
              expiresIn: '1m'
            }
          );
          res.status(200).json({
            token: token
          });
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
        if (!created) {
          return res.status(409).end();
        } else {
          res.status(200).end();
        }
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  addCategoryController: (req, res) => {
    const { categoryName } = req.body;
    let token = JSON.parse(req.headers.authorization);
    jwt.verify(token, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log(err);
      }
      if (decoded) {
        categories
          .findAll({
            where: {
              category_name: categoryName
            }
          })
          .then(data => {
            let checkList = []; // 같은명의 카테고리 id 리스트
            for (let i = 0; i < data.length; i++) {
              let chk = data[i].dataValues.id;
              checkList.push(chk);
            }
            users_categories
              .findAll({
                where: {
                  id: checkList
                }
              })
              .then(data => {
                let checkList = []; // 같은명의 카테고리 users_id 리스트
                for (let i = 0; i < data.length; i++) {
                  let chk = data[i].dataValues.users_id;
                  checkList.push(chk);
                }
                if (checkList.indexOf(decoded.id) === -1) {
                  categories
                    .create({ category_name: categoryName })
                    .then(data => {
                      let c = data.dataValues.id;

                      users_categories
                        .create({
                          categories_id: c,
                          users_id: decoded.id
                        })
                        .then(() => res.status(200).end());
                    });
                } else {
                  res.status(409).end();
                }
              });
          });
      } else {
        res.status(401).end();
      }
    });
  },
  addVideoController: (req, res) => {
    const { categoryName, video } = req.body;
    let token = JSON.parse(req.headers.authorization);
    jwt.verify(token, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log(err);
      }
      if (decoded) {
        categories
          .findAll({
            where: { category_name: categoryName }
          })
          .then(data => {
            if (data.length === 0) {
              res.status(409).end();
            } else {
              let checkList = []; // 같은명의 카테고리 users_id 리스트
              for (let i = 0; i < data.length; i++) {
                let chk = data[i].dataValues.id;
                checkList.push(chk);
              }

              users_categories
                .findAll({
                  where: {
                    categories_id: checkList
                  }
                })
                .then(data => {
                  let chk; // users_categories_id
                  for (let i = 0; i < data.length; i++) {
                    if (data[i].dataValues.users_id === decoded.id) {
                      chk = data[i].dataValues.categories_id;
                    }
                  }
                  users_categories_videos.create({
                    users_categories_id: chk,
                    video: JSON.stringify(video)
                  });
                  res.status(200).end();
                });
            }
          });
      } else {
        res.status(401).end();
      }
    });
  },

  categoryController: (req, res) => {
    const { categoryName } = req.body;
    let token = JSON.parse(req.headers.authorization);
    jwt.verify(token, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log(err);
      }
      if (decoded) {
        categories
          .findAll({
            where: { category_name: categoryName }
          })
          .then(data => {
            let checkList = []; // 같은명의 카테고리 id 리스트
            for (let i = 0; i < data.length; i++) {
              let chk = data[i].dataValues.id;
              checkList.push(chk);
            }

            users_categories
              .findAll({
                where: {
                  categories_id: checkList
                }
              })
              .then(data => {
                let chk; // users_categories_id
                for (let i = 0; i < data.length; i++) {
                  if (data[i].dataValues.users_id === decoded.id) {
                    chk = data[i].dataValues.categories_id;
                  }
                }
                users_categories_videos
                  .findAll({
                    where: { users_categories_id: chk }
                  })
                  .then(data => {
                    let checkList = []; // 카테고리 video 리스트
                    for (let i = 0; i < data.length; i++) {
                      let chk = JSON.parse(data[i].dataValues.video);
                      checkList.push(chk);
                    }
                    if (checkList.length === 0) {
                      res.status(204).end();
                    } else {
                      res.status(200).json({
                        videoList: checkList
                      });
                    }
                  });
              });
          });
      } else {
        res.status(401).end();
      }
    });
  },
  deleteVideoController: (req, res) => {
    const { categoryName, video } = req.body;
    let token = JSON.parse(req.headers.authorization);
    jwt.verify(token, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log(err);
      }
      if (decoded) {
        categories
          .findAll({
            where: { category_name: categoryName }
          })
          .then(data => {
            let checkList = []; // 같은명의 카테고리 users_id 리스트
            for (let i = 0; i < data.length; i++) {
              let chk = data[i].dataValues.id;
              checkList.push(chk);
            }

            users_categories
              .findAll({
                where: {
                  categories_id: checkList
                }
              })
              .then(data => {
                let chk; // users_categories_id
                for (let i = 0; i < data.length; i++) {
                  if (data[i].dataValues.users_id === decoded.id) {
                    chk = data[i].dataValues.categories_id;
                  }
                }
                users_categories_videos.destroy({
                  where: {
                    users_categories_id: chk,
                    video: JSON.stringify(video)
                  }
                });
                res.status(200).end();
              });
          });
      } else {
        res.status(401).end();
      }
    });
  },

  deleteCategoryController: (req, res) => {
    const { categoryName } = req.body;
    let token = JSON.parse(req.headers.authorization);
    jwt.verify(token, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log(err);
      }
      if (decoded) {
        // 카테고리에 해당하는 비디오 데이터들 삭제
        categories
          .findAll({
            where: { category_name: categoryName }
          })
          .then(data => {
            let checkList = []; // 같은명의 카테고리 users_id 리스트
            for (let i = 0; i < data.length; i++) {
              let chk = data[i].dataValues.id;
              checkList.push(chk);
            }
            users_categories
              .findAll({
                where: {
                  categories_id: checkList
                }
              })
              .then(data => {
                let chk; // users_categories_id
                for (let i = 0; i < data.length; i++) {
                  if (data[i].dataValues.users_id === decoded.id) {
                    chk = data[i].dataValues.categories_id;
                  }
                }
                users_categories_videos.destroy({
                  where: {
                    users_categories_id: chk
                  }
                });
              });
          });
        // 카테고리 삭제

        categories
          .findAll({
            where: {
              category_name: categoryName
            }
          })
          .then(data => {
            let checkList = []; // 같은명의 카테고리 id 리스트
            for (let i = 0; i < data.length; i++) {
              let chk = data[i].dataValues.id;
              checkList.push(chk);
            }

            users_categories
              .findAll({
                where: {
                  id: checkList
                }
              })
              .then(data => {
                let checkList = []; // 같은명의 카테고리 users_id 리스트

                for (let i = 0; i < data.length; i++) {
                  let chkNumber = data[i].dataValues;
                  checkList.push(chkNumber);
                }
                let cid; // 카테고리아이디
                for (let k = 0; k < checkList.length; k++) {
                  if (checkList[k].users_id === decoded.id) {
                    cid = checkList[k].categories_id;
                  }
                }

                users_categories.destroy({
                  where: {
                    categories_id: cid
                  }
                });
                categories.destroy({
                  where: {
                    id: cid
                  }
                });
              });
            res.status(200).end();
          });
      } else {
        res.status(401).end();
      }
    });
  }
};
