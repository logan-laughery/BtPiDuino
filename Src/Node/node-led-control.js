
console.log('started script');
var BTSP = require('bluetooth-serial-port');
var serial = new BTSP.BluetoothSerialPort();

console.log('loaded deps');

serial.on('found', function(address, name) {
    console.log('Device found: address-' + address + ' name-' + name);
    // you might want to check the found address with the address of your
    // bluetooth enabled Arduino device here.

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
});

serial.inquire();
