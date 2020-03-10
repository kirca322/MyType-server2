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
        // users_categories테이블의 users_id중에 decoded.id가 있으면,
        users_categories
          .findAll({ where: { users_id: decoded.id } })
          .then(result => {
            if (result.length) {
              let checkList = [];
              for (let i = 0; i < result.length; i++) {
                checkList.push(result[i].dataValues.categories_id);
              }
              categories.findAll({ where: { id: checkList } }).then(result => {
                let checkList = [];
                for (let i = 0; i < result.length; i++) {
                  checkList.push(result[i].dataValues.category_name);
                }
                res.status(200).json({
                  userCategoryList: checkList
                });
              });
            } else {
              res.status(204).end();
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
    if (req.body.googleId) {
      users
        .findOrCreate({
          where: { email: req.body.googleId },
          defaults: {
            password: req.body.googleId,
            username: req.body.googleName,
            mobile: req.body.googleId
          }
        })
        .then(([result, created]) => {
          let token = jwt.sign(
            {
              id: result.dataValues.id
            },
            jwtObj.secret,
            {
              expiresIn: '2m'
            }
          );
          res.status(200).json({
            token: token
          });
        })
        .catch(err => {
          res.status(404).send(err);
        });
    } else {
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
                expiresIn: '1h'
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
    }
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
          .findOrCreate({ where: { category_name: categoryName } })
          .then(([result, created]) => {
            //이미 있는 카테고리
            users_categories
              .create({
                users_id: decoded.id,
                categories_id: result.dataValues.id
              })
              .then(() => {
                res.status(200).end();
              });
          })
          .catch(err => {
            res.status(404).send(err);
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
          .findOne({
            where: { category_name: categoryName }
          })
          .then(result => {
            if (result) {
              // result.dataValues.id
              users_categories
                .findOne({
                  where: {
                    categories_id: result.dataValues.id,
                    users_id: decoded.id
                  }
                })
                .then(result => {
                  users_categories_videos
                    .create({
                      users_categories_id: result.dataValues.id,
                      video: JSON.stringify(video)
                    })
                    .then(result => {
                      res.status(200).end();
                    });
                });
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

  categoryController: (req, res) => {
    const { categoryName } = req.body;
    let token = JSON.parse(req.headers.authorization);
    jwt.verify(token, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log(err);
      }
      if (decoded) {
        categories
          .findOne({ where: { category_name: categoryName } })
          .then(result => {
            if (result) {
              users_categories
                .findOne({
                  where: {
                    categories_id: result.dataValues.id,
                    users_id: decoded.id
                  }
                })
                .then(result => {
                  users_categories_videos
                    .findAll({
                      where: { users_categories_id: result.dataValues.id }
                    })
                    .then(result => {
                      if (!result.length) {
                        res.status(204).end();
                      } else {
                        let checkList = [];
                        for (let i = 0; i < result.length; i++) {
                          checkList.push(
                            JSON.parse(result[i].dataValues.video)
                          );
                        }
                        res.status(200).json({
                          videoList: checkList
                        });
                      }
                    });
                });
            } else {
              res.status(404).end();
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
  deleteVideoController: (req, res) => {
    const { categoryName, video } = req.body;
    let token = JSON.parse(req.headers.authorization);
    jwt.verify(token, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log(err);
      }
      if (decoded) {
        categories
          .findOne({
            where: { category_name: categoryName }
          })
          .then(result => {
            users_categories
              .findOne({
                where: {
                  users_id: decoded.id,
                  categories_id: result.dataValues.id
                }
              })
              .then(result => {
                users_categories_videos
                  .destroy({
                    where: {
                      users_categories_id: result.dataValues.id,
                      video: JSON.stringify(video)
                    }
                  })
                  .then(result => {
                    res.status(200).end();
                  });
              });
          })
          .catch(err => {
            res.status(404).send(err);
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
        categories
          .findOne({
            where: { category_name: categoryName }
          })
          .then(result1 => {
            users_categories
              .findOne({
                where: {
                  categories_id: result1.dataValues.id,
                  users_id: decoded.id
                }
              })
              .then(result2 => {
                users_categories_videos
                  .destroy({
                    where: {
                      users_categories_id: result2.dataValues.id
                    }
                  })
                  .then(() => {
                    users_categories
                      .destroy({
                        where: {
                          categories_id: result1.dataValues.id,
                          users_id: decoded.id
                        }
                      })
                      .then(() => {
                        users_categories
                          .findOne({
                            where: {
                              categories_id: result1.dataValues.id,
                              users_id: decoded.id
                            }
                          })
                          .then(result => {
                            if (result) {
                              res.status(200).end();
                            } else {
                              categories
                                .destroy({
                                  where: { category_name: categoryName }
                                })
                                .then(() => {
                                  res.status(200).end();
                                });
                            }
                          });
                      });
                  });
              });
          })
          .catch(err => {
            res.status(404).send(err);
          });
      } else {
        res.status(401).end();
      }
    });
  }
};
