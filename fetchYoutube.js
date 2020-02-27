const fetch = require('node-fetch');

const fetchYoutube = data => {
  let query = encodeURI(data.dataValues.item);
  let key = 'AIzaSyAI-Ia8gNW6GASksuJCiBc5CdbrpA7e1Jk';
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${query}&maxResults=5&type=video&videoEmbeddable=true`;
  return fetch(url);
};

module.exports = fetchYoutube;
