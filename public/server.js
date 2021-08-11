/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const history = require("connect-history-api-fallback");
const path = require("path");
const serveStatic = require("serve-static");

const app = express();
const port = process.env.PORT || 3000;

app.use(history({
    verbose: true
}))

app.use(serveStatic(path.join(__dirname, '/dist')))

app.listen(port);