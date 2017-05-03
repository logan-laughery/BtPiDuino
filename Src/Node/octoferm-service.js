//https://github.com/sequelize/express-example
// Need to move service file to systemctl for this to work
const https = require('http');
var BTSP = require('bluetooth-serial-port');
var serial = new BTSP.BluetoothSerialPort();
var Sequelize = require('sequelize');

var sequelize = new Sequelize('octoferm-db', null, null, {
  dialect: 'sqlite',
  storage: './db/development.sqlite'
});
const db = {};
var Device = sequelize.define('device', {
  name: {
    type: Sequelize.STRING,
    field: 'name'
  }
});
Device.sync({force: true}).then(function () {
  return Device.create({
    name: 'Device Name'
  });
});

const hostname = '0.0.0.0';
const port = 1337;

var devices = [];
serial.on('found', function(address, name) {
    devices.push({name: address + ' - ' + name, value: {address: address, name: name}});
    // console.log('Device found: address-' + address + ' name-' + name);
    // you might want to check the found address with the address of your
    // bluetooth enabled Arduino device here.
});

// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var port = process.env.PORT || 1337;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/ping', function(req, res) {
    devices = [];
    serial.inquireSync();
    res.json({ devices: devices });
});

router.get('/devices', function(req, res) {
    Device.findOne().then(function (device) {
      res.json({ device: device });
    });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

//
//
// https.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World\n');
// }).listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
//
// var options = {
//   host: 'example.com',
//   port: 80,
//   path: '/foo.html'
// };
//
// http.get(options, function(resp){
//   resp.on('data', function(chunk){
//     //do something with chunk
//   });
// }).on("error", function(e){
//   console.log("Got error: " + e.message);
// });
