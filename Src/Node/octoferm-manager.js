// Need to move service file to systemctl for this to work
// const https = require('http');
//
// const hostname = '0.0.0.0';
// const port = 1337;
//
// https.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World\n');
// }).listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// var Device  = require('./service/bluetooth-device.js');
// var device = new Device('20:16:06:08:28:48');

var Ferm  = require('./service/octoferm-fermentor.js');
var ferm = new Ferm('20:16:06:08:28:48', 2);

var stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

function delayPromise(ms) {
    return new Promise(function(resolve, reject) {
        // Set up the timeout
        setTimeout(function() {
            resolve();
        }, ms);
    });
}

    // on any data into stdin
stdin.on( 'data', function( key ){
  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    console.log('exit pressed');
    ferm.close();
    process.exit();
  }
  if ( key === 'w' ) {
    console.log('w pressed')
    ferm.execute();
  }

  if ( key == 'i') {
    ferm.executeTest()
      .then(function infinite(){
        return delayPromise(5000)
          .then(() => ferm.executeTest())
          .then((response) => console.log(response))
          .then(infinite);
      }).catch((err) => {console.log("error: " + err)});
  }

  if ( key === 'q' ) {
    console.log('q pressed')
    ferm.getTemp();
  }

  if ( key === 'p' ) {
    console.log('p pressed');
    device.executeCommand('ping', 'ping', 1000)
      .then(function(value){console.log('Response: ' + value)})
      .catch(function(err){console.log('Error: ' + err)});
  }

  if ( key === 't' ) {
    console.log('t pressed');
    device.executeCommand('tempstatus:', 'tempstatus:', 1000)
      .then(function(value){console.log('Response: ' + value)})
      .catch(function(err){console.log('Error: ' + err)});
  }

  if ( key === 'r' ) {
    device.executeCommand('pumpstatus:', 'pumpstatus:', 1000)
      .then(function(value){console.log('Response: ' + value)})
      .catch(function(err){console.log('Error: ' + err)});
  }

  if ( key === 's' ) {
    device.executeCommand('state', 'state', 1000)
      .then(function(value){console.log('Response: ' + value)})
      .catch(function(err){console.log('Error: ' + err)});
  }

  if ( key === 'e' ) {
    device.executeCommand('temp', 'temp', 1000)
      .then(function(value){console.log('Response: ' + value)})
      .catch(function(err){console.log('Error: ' + err)});
  }

  // write the key to stdout all normal like
  process.stdout.write( key );
});
