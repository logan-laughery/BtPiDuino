var models  = require('../data/models');
var BluetoothScanner = require('../service/bluetooth-scanner.js');
var express = require('express');
var router  = express.Router();

router.post('/', function(req, res) {
  models.Device.create({
    name: req.body.name,
    address: req.body.address
  }).then(function() {
    res.json({ success: true });
  }).catch(function(err) {
    res.json({error: err});
  });
});

router.post('/:id', function(req, res) {
  // models.Device.update({
  //   name: req.body.name,
  //   address: req.body.address
  // }, { where: { id: req.params.id }})
  models.Device.findById(req.params.id)
  .then(function(record){
    return record.updateAttributes({
      name: req.body.name,
      address: req.body.address
    });
  }).then(function() {
    res.json({ success: true });
  }).catch(function(err) {
    res.json({error: err});
  });
});

router.get('/', function(req, res) {
  models.Device.findAll()
  .then(function (devices) {
    res.json({ devices: devices });
  }).catch(function(err) {
    res.json({error: err});
  });
});

router.delete('/:id', function(req, res) {
  models.Device.findById(req.params.id)
  .then(function(record){
    return record.destroy();
  }).then(function() {
    res.json({ success: true });
  }).catch(function(err) {
    res.json({error: err});
  });
});

router.get('/', function(req, res) {
  models.Device.findAll()
  .then(function (devices) {
    res.json({ devices: devices });
  }).catch(function(err) {
    res.json({error: err});
  });
});

router.get('/scan', function (req, res) {
  var scanner = new BluetoothScanner(0);
  var devices = scanner.scanSync();
  res.json({ devices: devices });
});

router.get('/:id/logs', function(req, res) {
  models.Log.findAll({ where: {DeviceId : req.params.id}})
  .then(function (logs) {
    res.json({ logs: logs });
  }).catch(function(err) {
    res.json({error: err});
  });
});

module.exports = router;
