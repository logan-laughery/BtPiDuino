// Example useage:
// node octoferm-manager.js 2 < /dev/null > ferm2.log 2>&1 &

var Ferm  = require('./service/octoferm-fermentor.js');
var models  = require('./data/models');


var stdin = process.stdin;

var deviceId = process.argv[2];

if(!deviceId) {
  console.error('Must provide a device id');
  return;
}

var ferm;

function delayPromise(ms) {
  return new Promise(function(resolve, reject) {
      // Set up the timeout
      setTimeout(function() {
          resolve();
      }, ms);
  });
}

function loop() {
  return delayPromise(500)
    .then(() => ferm.loop())
    .catch((err) => {console.error("Error: " + err)})
    .then(loop);
}

function getDevice() {
  var self = this;
  return models.Device.findById(deviceId, {
    include: [{ model: models.Settings }]
  })
  .then(function (device) {
    //console.log(JSON.stringify(device));
    ferm = new Ferm(device.address, deviceId)
  });
}
getDevice()
  .then(() => loop());
