
#include "CommandListener.h"
#include "BluetoothManager.h"
#include "SerialManager.h"
#include "CommandDeserializer.h"
#include "CommandAbstract.h"
#include "Arduino.h"

CommandListener::CommandListener()
{
  this->rawInput[0] = 0;
}

CommandAbstract * CommandListener::GetCommand()
{
  BluetoothManager& bluetoothManager = BluetoothManager::GetInstance();
  SerialManager& serialManager = SerialManager::GetInstance();
  CommandDeserializer& commandDeserializer = CommandDeserializer::GetInstance();

  char input = bluetoothManager.Read();
  if (input != (char) 0)
  {
    serialManager.Debug(input);
    //bluetoothManager.Write(input);

    if (this->IsFullCommand(input))
    {
      return commandDeserializer.DeserializeCommand(this->rawInput);
    }
  }

  return NULL;
}

char CommandListener::Test()
{
  BluetoothManager& bluetoothManager = BluetoothManager::GetInstance();
  SerialManager& serialManager = SerialManager::GetInstance();

  char output = serialManager.Read();
  if (output != (char) 0) {
    bluetoothManager.Write(output);
  }

  char input = bluetoothManager.Read();
  if (input != (char) 0) {
    serialManager.Write(input);
  }


  return (char) 0;
}

// Processes next char and returns true if a full command
// has been recieved
bool CommandListener::IsFullCommand(char newChar)
{
  bool isFullCommand = false;
  if (newChar == '{')
  {
    this->ResetRawCommand();
  }
  else if (newChar == '}')
  {
    isFullCommand = true;
  }
  this->rawInput[this->rawCharCount] = newChar;
  this->rawCharCount++;
  return isFullCommand;
}

// Set this->rawInput to an empty array
void CommandListener::ResetRawCommand()
{
  for( int i = 0; i < sizeof(this->rawInput);  ++i )
   this->rawInput[i] = (char)0;
  this->rawCharCount = 0;
}
