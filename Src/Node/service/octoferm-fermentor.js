//http://stackoverflow.com/questions/18188083/javascript-oop-in-nodejs-how
//http://stackoverflow.com/questions/17580347/programmatically-removing-all-bluetooth-devices-on-the-linux-command-line
// Use bt-device -l to list all devices (from bluez-tools)
var BluetoothDevice = require('./bluetooth-device.js');
var models  = require('../data/models');
var method = Fermentor.prototype;

function Fermentor(address, id) {
  this.id = id;
  this.settings = {};
  this.desiredSettings = {};
  this.device = new BluetoothDevice(address);
}

method.execute = function() {
  // Update state
  //this.getDevice().then(() => getTemp())
    //.catch((err) => {console.log(err)});
    var self = this;
    this.test2().then(() => self.getTemp())
      .catch(err => {console.log(err)});
  // Wait 1 second
  // Check for actions

  // Then wait 5 seconds

  // Get temp

  // Then wait call execute in 5 seconds

  // Catch exceptions and wait to execute accordingly
}

method.test = function() {
  models.Device.findAll()
  .then(function (devices) {
    console.log(devices);
  }).catch(function(err) {
    console.log(err);
  });
}
method.test2 = function() {
  var self = this;
  return models.Device.findById(self.id)
  .then(function (device) {
    self.desiredSettings = device.settings;
  });
}

method.getDevice = function () {
  var self = this;
  return models.Device.findById(self.id)
    .then((dev) => { self.desiredSettings = dev.settings });
}

method.checkForActions = function () {

}

method.setTemp = function() {
  var self = this;
  var actual = self.settings;
  var desired = self.desiredSettings;
  return Promise(resolve => {
    if(desired.temperature && acutal.temperature != desired.temperature) {
      var command = 'temp:' + desired.temperature;
      return self.sendCommand(command, 'temp');
    }
  })
}

method.setPump = function() {
  var self = this;
  var actual = self.settings;
  var desired = self.desiredSettings;
  return Promise(resolve => {
    if(desired.temperature && acutal.pumpState != desired.pumpState) {
      var command = 'ps:' + desired.pumpState;
      return self.sendCommand(command, 'ps');
    }
  })
}

method.getTemp = function() {
  var self = this;
  return self.sendCommand('tempstatus:', 'tempstatus')
    .then((response) =>  console.log(response));
}

method.sendCommand = function(command, expected) {
  var self = this;
  return self.device.executeCommand(command, expected, 1000)
    .catch((err) => {
      console.log('Err: ' + err)
      console.log('Attempting to send command again')
      return self.device.executeCommand(command, expected, 1000)}
    );
}

method.updateStatus = function() {

}

module.exports = Fermentor;
