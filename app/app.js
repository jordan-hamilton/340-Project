// Import modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');

var credentials = require('./credentials.js');

// Import routes
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var foodTrucksRouter = require('./routes/foodTrucks');
var customersRouter = require('./routes/customers');
var locationsRouter = require('./routes/locations');
var reviewsRouter = require('./routes/reviews');
var customersFoodTrucksRouter = require('./routes/customersFoodTrucks');

var app = express();

// Configure Handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure sessions
var expressSession = {
  secret: credentials.secret,
  cookie: {},
  resave: false,
  saveUninitialized: true
}
app.use(session(expressSession))

// Configure routes
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/food-trucks', foodTrucksRouter);
app.use('/customers', customersRouter);
app.use('/locations', locationsRouter);
app.use('/reviews', reviewsRouter);
app.use('/customers-food-trucks', customersFoodTrucksRouter);

// Catch 404 errors
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
