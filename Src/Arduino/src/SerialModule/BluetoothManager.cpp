// Connect the Hc-06 module and communicate
//
// The HC-06 defaults to AT mode when first powered on.
// The default baud rate is 9600
// The Hc-06 requires all AT commands to be in uppercase. NL+CR should not be added to the command string

#include "BluetoothManager.h"
#include "Arduino.h"
#include <SoftwareSerial.h>

SoftwareSerial BTserial(2, 3);
// // RX | TX
// Connect the HC-06 TX to the Arduino RX on pin 2.
// Connect the HC-06 RX to the Arduino TX on pin 3 through a voltage divider.

BluetoothManager::BluetoothManager()
{
  // HC-06 default serial speed is 9600
  BTserial.begin(9600);
}

char BluetoothManager::Read()
{
  // Read from HC-06 if available
  return BTserial.read();
}

void BluetoothManager::Write(char output[])
{
  // Write single char
  BTserial.write(output);
}

void BluetoothManager::Write(char output)
{
  // Write string
  BTserial.write(output);
}

bool BluetoothManager::Available()
{
  // Read from HC-06 if available
  return BTserial.available();
}
