const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

let indexRouter = require('./routes/index');
let notificationRouter = require('./routes/notifier');
let authRouter = require('./routes/auth');
let retrieveTokenRouter = require('./routes/retrieveToken');
let createUserRouter = require('./routes/createUser');
let verify2fa = require('./routes/verify2fa');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/notify', notificationRouter);
app.use('/authenticate', authRouter);
app.use('/retrieveToken', retrieveTokenRouter);
app.use('/create', createUserRouter);
app.use('/verify2fa', verify2fa);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
