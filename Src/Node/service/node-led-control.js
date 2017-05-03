'use strict';
var BTSP = require('bluetooth-serial-port');
var inquirer = require('inquirer');
var BottomBar = inquirer.ui.BottomBar;
var serial = new BTSP.BluetoothSerialPort();

var devices = [];

var loader = [
    '/ Searching',
    '| Searching',
    '\\ Searching',
    '- Searching'
]
var i = 4;
var ui = new BottomBar({bottomBar: loader[i % 4]});

setInterval(function () {
    ui.updateBottomBar(loader[i++ % 4]);
}, 300);

serial.on('found', function(address, name) {
    devices.push({name: address + ' - ' + name, value: {address: address, name: name}});
    // console.log('Device found: address-' + address + ' name-' + name);
    // you might want to check the found address with the address of your
    // bluetooth enabled Arduino device here.
});


var connect = function (address) {
    serial.findSerialPortChannel(address, function(channel) {
        serial.connect(address, channel, function() {
            console.log('connected');
            process.stdin.resume();
            console.log('Type something to send it to the bluetooth device')

            process.stdin.on('data', function (data) {
                serial.write(new Buffer(data, 'utf-8'), function(err, bytesWritten){
			        if (err) console.log(err);
		        });
            });

            serial.on('data', function(buffer) {
                console.log('Received: ' + buffer.toString('utf-8'));
            });
        }, function () {
            console.log('cannot connect');
        });
    });
}

serial.on('finished', function() {
    ui.updateBottomBar('');
    ui.close();
    inquirer.prompt([
        {
            type: 'list',
            name: 'device',
            message: 'Which device do you want to connect to?',
            choices: devices
        }
    ]).then(function (answer) {
        // console.log(JSON.stringify(answer, null, ' '));
        connect(answer.device.address);
    }) 
});


serial.inquire();
