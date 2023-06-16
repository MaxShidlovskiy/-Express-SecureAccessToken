const express = require(`express`);
const bodyParser = require(`body-parser`);
const cors = require(`cors`)
const user = require(`./controller/user.controller`);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(`/user`, user);
app.use((err, req, res, _next) => res.send(err.message));

module.exports = app;