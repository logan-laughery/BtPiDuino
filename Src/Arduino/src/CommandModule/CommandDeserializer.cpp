
#include "CommandDeserializer.h"
#include "CommandAbstract.h"
#include "Arduino.h"
#include "SerialManager.h"
#include "BluetoothManager.h"
#include <string.h>


CommandDeserializer::CommandDeserializer()
{
}

CommandAbstract * CommandDeserializer::DeserializeCommand(char rawCommand[])
{
  SerialManager& serialManager = SerialManager::GetInstance();
  BluetoothManager& bluetoothManager = BluetoothManager::GetInstance();
  serialManager.Debug(rawCommand);

  if (strcmp(rawCommand, "{ping}")  == 0)
  {
    bluetoothManager.Write('p');
    return NULL;
  }
  else if (strcmp(rawCommand, "{state}")  == 0)
  {
    bluetoothManager.Write('s');
    return NULL;
  }
  return NULL;
}

// char[] ExtractCommandName(char rawCommand[])
// {
// }
//
// char[] ExtractArgument(char rawCommand[])
// {
//
// }
