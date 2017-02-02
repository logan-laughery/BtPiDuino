# BtPiDuino
A basic example for setting up Bluetooth communication between a Raspberry Pi and an Arduino Nano using Node.

# Setup

## Arduino
Hardware
* The hardware consists of an Arduino Nano ATMEGA328P (https://www.amazon.com/gp/product/B00UACD13Q/ref=oh_aui_detailpage_o06_s00?ie=UTF8&psc=1) 
  and an HC-06 (https://www.amazon.com/gp/product/B00TNOO438/ref=oh_aui_detailpage_o06_s00?ie=UTF8&psc=1).
* Wiring can be accomplished by by following this guide: http://www.martyncurrey.com/arduino-and-hc-06-zs-040/.
Programming
* Programming the Nano was done on Windows 10 which required the following driver (http://www.arduined.eu/ch340-windows-8-driver-download/)
* BluetoothSerial.ino was uploaded to the Nano using Arduino IDE (https://www.arduino.cc/en/main/software)
* Testing can be done at this step by first determining the correct COMM using Windows Device Manager and then
  opening a serial monitor through Arduino IDE using that COMM

Raspberry Pi
* Various steps were taken to get the HC-06 module connecting to the Pi.  It seems that setting up a pairing
  through Bluetoothctl was the most successful (https://bbs.archlinux.org/viewtopic.php?id=170359):
    $ sudo apt-get install bluez
    $ bluetoothctl
    --In bluetoothctl
    $ agent on
    $ default-agent
    $ scan on
    ...Wait
    $ pair <mac-address>
    ...Enter pin
    $ trust <mac-address>
    $ quit
    --bluetoothctl now exited
    $ sudo rfcomm connect hci0 <mac-address>
    --In another tty, run 'cat /dev/rfcomm0' and 'echo "test" > /dev/rfcomm0'
    --to verify bluetooth is working.  The results should be output in the serial monitor
    --of Arduino IDE.  
    --THE RFCOMM WILL NEED TO BE STOPPED TO ACCESS THE HC-06 USING Node

Bluetooth Connection With Node On Rasberry Pi
* Update Node 
* Install node-bluetooth-serial-port (https://github.com/eelcocramer/node-bluetooth-serial-port)
  with 'npm install bluetooth-serial-port'
* Run with 'node-led-control.js'