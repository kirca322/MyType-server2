const express = require('express');

const app = express();

const port = 3001;

app.use('/', (req, res) => res.send('Hello World'));

app.listen(port, () => {
  console.log(`app is listening in PORT ${port}`);
});
