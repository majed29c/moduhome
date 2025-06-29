const express = require('express');
const routes = require('./src/routes/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

module.exports = app;
