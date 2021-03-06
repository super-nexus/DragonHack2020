let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const bodyParser = require('body-parser');
let hbs = require('hbs');
let fs = require('fs');
const spawn = require("child_process").spawn;
let schedule = require('node-schedule');
let axios = require('axios');


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/userRoutes');
let dataRouter = require('./routes/dataRoutes');
let feelingRouter = require('./routes/feelingRoutes');
let {mongoose} = require('./db/mongoose');

let db = mongoose.connection;
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, 'routes', 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/data', dataRouter);
app.use('/user', usersRouter);
app.use('/feeling', feelingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let j = schedule.scheduleJob('7 0 * * *', function(){
  const pythonProcess = spawn('python',["./bin/atributes_script.py"]);
  pythonProcess.stdout.on('data', (data) => {
    fs.writeFile("./db/storage.txt", data, function (err) {
      if(err){console.error("Something went wront with storing data")}
    })
  });
});

const pythonProcess = spawn('python',["./bin/atributes_script.py"]);
pythonProcess.stdout.on('data', (data) => {
  console.log("DAta", data.toString());
  axios.post("http://localhost:3000/data/addIdeal", JSON.parse(data.toString().trim())).then( res => {
    console.log("Success");
  }).catch((err) => {
    console.error(err);
  })
});


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.info("Successfuly connected to mongodb database");
});

module.exports = app;
