const { categories } = require('../../models');
const fetchYoutube = require('../../fetchYoutube');

module.exports = {
  get: (req, res) => {
    categories
      .findOne({ where: { category_number: req.params.id } })
      .then(data => {
        fetchYoutube(data)
          .then(res => res.json())
          .then(json => res.status(200).json(json.items))
          .catch(error => {
            console.log(error);
            res.sendStatus(500);
          });
      });
  }
};
