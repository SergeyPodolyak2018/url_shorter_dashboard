const express = require('express');
const cookieParser = require('cookie-parser');
const ejsLayouts = require('express-ejs-layouts');
const { BASE_URI } = require('./const');
const shortsRouter = require('./routes/shortsRouter');
const mainRouter = require('./routes/mainRouter');
const authRouter = require('./routes/authRouter');

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));
app.use(ejsLayouts);
app.set('layout', './layout');
app.set('view engine', 'ejs');

app.use(`${BASE_URI}`, mainRouter);
app.use(`${BASE_URI}/auth`, authRouter);
app.use(`${BASE_URI}/shorts`, shortsRouter);

module.exports = app;
