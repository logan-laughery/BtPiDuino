
#include "CommandDeserializer.h"
#include "CommandAbstract.h"
#include "Arduino.h"
#include "SerialManager.h"
#include "BluetoothManager.h"
#include <string.h>
#include "PingCommand.h"
#include "StateCommand.h"
#include "TempStatusCommand.h"
#include "MemStatusCommand.h"
#include "PumpStatusCommand.h"
#include "SetTempCommand.h"


CommandDeserializer::CommandDeserializer()
{
}

CommandAbstract * CommandDeserializer::DeserializeCommand(char rawCommand[])
{
  SerialManager& serialManager = SerialManager::GetInstance();
  BluetoothManager& bluetoothManager = BluetoothManager::GetInstance();

  String rawCommandString = String(rawCommand);

  serialManager.Debug(String("Received: " + rawCommandString));

  //bluetoothManager.Write(rawCommand);

  if (rawCommandString.startsWith("{ping"))
  {
    return new PingCommand;
  }
  else if (rawCommandString.startsWith("{state:"))
  {
    return new StateCommand(this->ExtractArgument(rawCommandString));
  }
  else if (rawCommandString.startsWith("{tempstatus"))
  {
    //bluetoothManager.Write(String("tempstatus"));
    return new TempStatusCommand;
  }
  else if (rawCommandString.startsWith("{memstatus"))
  {
    //bluetoothManager.Write(String("memstatus"));
    return new MemStatusCommand;
  }
  else if (rawCommandString.startsWith("{pumpstatus:"))
  {
    return new PumpStatusCommand;
  }
  else if (rawCommandString.startsWith("{temp:"))
  {
    return new SetTempCommand(this->ExtractArgument(rawCommandString));
  }
  return NULL;
}

String CommandDeserializer::ExtractArgument(String rawCommand)
{
  int argStart = rawCommand.indexOf(":") + 1;
  int argEnd = rawCommand.indexOf("}");
  return rawCommand.substring(argStart, argEnd);
}
