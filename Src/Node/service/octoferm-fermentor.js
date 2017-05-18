//http://stackoverflow.com/questions/18188083/javascript-oop-in-nodejs-how
//http://stackoverflow.com/questions/17580347/programmatically-removing-all-bluetooth-devices-on-the-linux-command-line
// Use bt-device -l to list all devices (from bluez-tools)
var BluetoothDevice = require('./bluetooth-device.js');
var models  = require('../data/models');
var method = Fermentor.prototype;

function Fermentor(address, id, verbose) {
  this.id = id;
  this.settings = {};
  this.desiredSettings = {};
  this.device = new BluetoothDevice(address);
  this.verbose = verbose;
}

method.close = function() {
  this.device.close();
}

method.executeTest = function() {
  var self = this;
  return this.getDevice().then(() => self.getTemp());
}

method.log = function(message) {
  var self = this;
  if(self.verbose) {
    console.log(message);
  }
}

method.execute = function() {
  // Update state
  //this.getDevice().then(() => getTemp())
    //.catch((err) => {console.log(err)});
    var self = this;
    return this.getDevice().then(() => self.getTemp())
      .then(() => {self.log('Completed command')})
      .catch(err => {self.log('Error occurred:' + err)});
  // Wait 1 second
  // Check for actions

  // Then wait 5 seconds

  // Get temp

  // Then wait call execute in 5 seconds

  // Catch exceptions and wait to execute accordingly
}

method.getDevice = function() {
  var self = this;
  return models.Device.findById(self.id)
  .then(function (device) {
    self.log('Result retrieved from db');
    self.desiredSettings = device.settings;
  });
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
  self.log('Get temp');
  return self.sendCommand('tempstatus:', 'tempstatus');
}

method.sendCommand = function(command, expected) {
  var self = this;
  return self.device.executeCommand(command, expected, 1000)
    .catch((err) => {
      self.log('Err: ' + err)
      self.log('Attempting to send command again')
      return self.device.executeCommand(command, expected, 1000)}
    );
}

method.updateStatus = function() {

}

module.exports = Fermentor;
