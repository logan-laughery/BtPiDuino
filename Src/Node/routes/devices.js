var models  = require('../data/models');
//var BluetoothScanner = require('../service/bluetooth-scanner.js');
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
    console.log(err)
    res.json({error: JSON.stringify(err)});
  });
});

router.get('/details', function(req, res) {
  models.sequelize.query("Select d.id as 'deviceId', settings.temperature as 'desiredTemperature'," +
    "statuses.createdAt as 'lastConnected', d.name as 'name', d.address as 'address'," +
    "statuses.temperature as 'actualTemperature', statuses.pumpState as 'pumpRunning',  " +
    "settings.pumpState as 'desiredPumpState' from Devices d " +
    "left outer join Settings settings on settings.deviceid = d.id " +
    "left outer join Statuses statuses on statuses.id = " +
    "(select top 1 s2.id from Statuses s2 where s2.deviceid=d.id order by s2.createdAt desc )"
  ).spread((devices, metadata) => {
    res.json({ devices: devices });
  }).catch(function(err) {
    res.json({error: JSON.stringify(err)});
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
  models.Log.findAll({ where: {DeviceId : req.params.id},
    order: [ ['createdAt', 'DESC']],
    limit: 20})
  .then(function (logs) {
    res.json({ logs: logs });
  }).catch(function(err) {
    res.json({error: err});
  });
});

router.post('/:id/logs', function(req, res) {
  models.Log.create({
    DeviceId: req.params.id,
    error: req.body.error,
    message: req.body.message
  }).then(function() {
    res.json({ success: true });
  }).catch(function(err) {
    res.json({error: err});
  });
});

router.get('/:id/status', function(req, res) {
  models.Status.findAll({ where: {DeviceId : req.params.id},
    order: [ ['createdAt', 'DESC']],
    limit: 10 })
  .then(function (status) {
    res.json({ status: status });
  }).catch(function(err) {
    res.json({error: err});
  });
});

router.get('/:id/status/minute', function(req, res) {
  models.sequelize.query("select top 10000 " +
    "avg(temperature) as 'temperature'," +
    "convert(varchar(10),cast(createdAt as date))+ ' ' +" +
    "convert(varchar(10),datepart(hour,createdAt))+ ':' +" +
    "convert(varchar(10),datepart(minute,createdAt))+ ':00'" +
    " as 'createdAt' "+
    "from statuses where deviceid=? " +
    "and createdAt < ? and createdAt > ? " +
    "group by cast(createdAt as date), datepart(hour, createdAt),"+
    "datepart(minute, createdAt) " +
    "order by cast(createdAt as date)asc, datepart(hour, createdAt)asc,"+
    "datepart(minute, createdAt)asc",
    {replacements: [req.params.id, req.query.before, req.query.after]}
  ).spread((statuses, metadata) => {
    res.json({ statuses: statuses });
  }).catch(function(err) {
    res.json({error: JSON.stringify(err)});
  });
});

router.post('/:id/status', function(req, res) {
  models.Status.create({
    DeviceId: req.params.id,
    temperature: req.body.temperature,
    pumpState: req.body.pumpState,
    automatic: req.body.automatic,
  }).then(function() {
    res.json({ success: true });
  }).catch(function(err) {
    res.json({error: err});
  });
});

router.get('/:id/settings', function(req, res) {
  models.Device.findById(req.params.id, {
    include: [{ model: models.Settings }]
  }).then(function (device) {
    res.json({ settings: device.Setting });
  }).catch(function(err) {
    res.json({error: err});
  });
});

router.post('/:id/settings', function(req, res) {
  models.Settings.find({where: { DeviceId: req.params.id}})
  .then(function(record){
    if(record){
      console.log(req.body) 
      return record.updateAttributes({
        temperature: req.body.temperature,
        pumpState: req.body.pumpState
      });
    } else {
      return models.Settings.create({
        DeviceId: req.params.id,
        temperature: req.body.temperature,
        pumpState: req.body.pumpState
      });
    }
  }).then(function() {
    res.json({ success: true });
  }).catch(function(err) {
    res.json({error: err});
  });
});

router.delete('/:id/settings', function(req, res) {
  models.Settings.find({where: { DeviceId: req.params.id}})
  .then(function(record){
    return record.destroy();
  }).then(function() {
    res.json({ success: true });
  }).catch(function(err) {
    res.json({error: err});
  });
});

module.exports = router;
