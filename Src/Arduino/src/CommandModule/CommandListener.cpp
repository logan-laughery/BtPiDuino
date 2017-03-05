
#include "CommandListener.h"
#include "BluetoothManager.h"
#include "SerialManager.h"

CommandListener::CommandListener()
{
}

char CommandListener::GetCommand()
{
  BluetoothManager& bluetoothManager = BluetoothManager::GetInstance();
  SerialManager& serialManager = SerialManager::GetInstance();

  char input = bluetoothManager.Read();
  if (input != (char) 0) {
    serialManager.Debug(input);
  }

  return input;
}
