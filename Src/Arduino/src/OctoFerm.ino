// Basic Bluetooth sketch HC-06_01
// Connect the Hc-06 module and communicate using the serial monitor
//
// The HC-06 defaults to AT mode when first powered on.
// The default baud rate is 9600
// The Hc-06 requires all AT commands to be in uppercase. NL+CR should not be added to the command string
//


#include <SoftwareSerial.h>
#include "BluetoothManager.h"
#include "SerialManager.h"
#include "CommandListener.h"
#include "CommandAbstract.h"
#include "ActionManager.h"

CommandListener commandListener;
ActionManager actionManager;

void setup()
{
}

void loop()
{
  SerialManager& serialManager = SerialManager::GetInstance();
  BluetoothManager& bluetoothManager = BluetoothManager::GetInstance();

  //relayManager.SetOneOff();

  char output = serialManager.Read();
  if (output != (char) 0) {
    //serialManager.Write(output);
    bluetoothManager.Write(output);
  }

//  char input = bluetoothManager.Read();
//  if (input != (char) 0) {
//    serialManager.Write(input);
//  }

  CommandAbstract * command = commandListener.GetCommand();
  if (command != NULL)
  {
    command->UpdateSettings();
  }
  actionManager.PerformActions();
}
