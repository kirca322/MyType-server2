const fetch = require('node-fetch');

const fetchYoutube = data => {
  let query = encodeURI(data.dataValues.item);
  let key = 'AIzaSyAtXfgXrIOmPCr---pCtv53S2wbQwAR9Mo';
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${query}&maxResults=10&type=video&videoEmbeddable=true`;
  return fetch(url);
};

module.exports = fetchYoutube;
