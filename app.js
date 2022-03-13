var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
const { spawn } = require('child_process');
const cron = require('node-cron');

// mongodump --db=visits --archive=C:\Users\Eslam\Desktop\visits.gzip --gzip
// mongorestore --db=visits --archive=C:\Users\Eslam\Desktop\visit.gzip --gzip
// cron.schedule('* * * * *', () => backupmongoDB());

// const DB_Name = 'visit';
// const archive = `C:/Users/Eslam/Desktop/visit.gzip`;

// function backupmongoDB(params) {
//   const child = spawn('mongodump', [
//     `--db=${DB_Name}`,
//     `--archive=${archive}`,
//     `--gzip`,
//   ]);
//   child.stdout.on('data', (data) => {
//     console.log('stdout:/n', data);
//   });
//   child.stderr.on('data', (data) => {
//     console.log('stderr:/n', Buffer.from(data).toString());
//   });
//   child.on('error', (error) => {
//     console.log(error);
//   });
//   child.on('exit', (code, signal) => {
//     if (code) console.log('process exit with code:', code);
//     else if (signal) console.log('process kild with signal:', signal);
//     else console.log('backup is sucsessful');
//   });
// }

mongoose
  .connect(
    'mongodb+srv://eslam:mohamed_1993@cluster0.jl2e4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    // 'mongodb://localhost/visit'
  )
  .then((result) => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err);
  });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
