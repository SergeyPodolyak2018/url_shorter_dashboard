const express = require('express');
const cookieParser = require('cookie-parser');
const ejsLayouts = require('express-ejs-layouts');
const { BASE_URI } = require('./const');
const urlRouter = require('./routes/urlRouter');
const codeRouter = require('./routes/codeRouter');
const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const createRouter = require('./routes/createRouter');
const mainRouter = require('./routes/mainRouter');

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));
app.use(ejsLayouts);
app.set('layout', './layout');
app.set('view engine', 'ejs');

app.use(`${BASE_URI}`, mainRouter);
app.use(`${BASE_URI}/url`, urlRouter);
app.use(`${BASE_URI}/code`, codeRouter);
app.use(`${BASE_URI}/user`, userRouter);
app.use(`${BASE_URI}/login`, loginRouter);
app.use(`${BASE_URI}/create`, createRouter);

module.exports = app;
