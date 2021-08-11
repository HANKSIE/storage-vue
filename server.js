/* eslint-disable @typescript-eslint/no-var-requires */
const history = require('connect-history-api-fallback');
const express = require('express');
const app = express();

// Serve all the files in '/dist' directory
app.use(history());
app.use('/', express.static('dist'));

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});