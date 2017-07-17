var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var devices  = require('./routes/devices');
var router  = express.Router();


var app = express();

const hostname = '0.0.0.0';
const port = 1337;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.options('*', cors());

// ROUTES FOR OUR API
// =============================================================================
app.use('/devices', devices);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'error': {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  }});
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening port ' + port);
