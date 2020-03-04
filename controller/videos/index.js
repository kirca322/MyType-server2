const { search_keywords } = require('../../models');
const fetchYoutube = require('../../fetchYoutube');

module.exports = {
  get: (req, res) => {
    search_keywords
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
  },

  searchController: (req, res) => {
    const { searchValue } = req.body;
    fetchYoutube(searchValue)
      .then(res => res.json())

      .then(json => res.status(200).json(json.items))
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  }
};
