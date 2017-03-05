// Basic Bluetooth sketch HC-06_01
// Connect the Hc-06 module and communicate using the serial monitor
//
// The HC-06 defaults to AT mode when first powered on.
// The default baud rate is 9600
// The Hc-06 requires all AT commands to be in uppercase. NL+CR should not be added to the command string
//


#include <SoftwareSerial.h>
#include "BluetoothTranslater.h"
#include "BluetoothManager.h"
#include "SerialManager.h"
#include "CommandListener.h"

CommandListener commandListener;

void setup()
{
}

void loop()
{
  SerialManager& serialManager = SerialManager::GetInstance();
  BluetoothManager& bluetoothManager = BluetoothManager::GetInstance();

  char output = serialManager.Read();
  if (output != (char) 0) {
    bluetoothManager.Write(output);
  }

//  char input = bluetoothManager.Read();
//  if (input != (char) 0) {
//    serialManager.Write(input);
//  }

  char command = commandListener.GetCommand();
}
