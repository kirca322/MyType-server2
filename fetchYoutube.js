const fetch = require('node-fetch');
const youtubeObj = require('./config/youtubeKey');
const fetchYoutube = data => {
  let query;
  if (typeof data === 'object') {
    query = encodeURI(data.dataValues.item);
  } else if (typeof data === 'string') {
    query = encodeURI(data);
  }
  // let query = encodeURI(data.dataValues.item);
  let key = youtubeObj.secret;
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${query}&maxResults=10&type=video&videoEmbeddable=true`;
  return fetch(url);
};

module.exports = fetchYoutube;
