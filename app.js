const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

let indexRouter = require('./routes/index');
let notificationRouter = require('./routes/notifier');
let authRouter = require('./routes/auth');
let retrieveTokenRouter = require('./routes/retrieveToken');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/notify', notificationRouter);
app.use('/authenticate', authRouter);
app.use('/retrieveToken', retrieveTokenRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
