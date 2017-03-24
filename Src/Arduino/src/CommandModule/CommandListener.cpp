
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

  //Likely need to loop the bluetoothManager with a delay
  //to grab all available char's before continuing (may need to look at flushing
  //to avoid issues with similutaneous bluetooth commands)
  bool commandRecieved = false;
  while (bluetoothManager.Available() && !commandRecieved)
  {
    char input = bluetoothManager.Read();
    delay(2);
    serialManager.Debug((char)input);
    commandRecieved = this->IsFullCommand(input);
  }

  if (!commandRecieved)
    return NULL;

  // Flush like here
  // https://www.baldengineer.com/when-do-you-use-the-arduinos-to-use-serial-flush.html
  while (bluetoothManager.Available())
    bluetoothManager.Read();

  serialManager.Debug('t');
  serialManager.Debug('e');
  serialManager.Debug('s');
  serialManager.Debug('t');

  bluetoothManager.Write('d');
  return commandDeserializer.DeserializeCommand(this->rawInput);
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

  // Clear if we've exceeded command size
  if (this->rawCharCount > 19)
  {
    this->ResetRawCommand();
    return false;
  }

  if (newChar == '{')
  {
    this->ResetRawCommand();
  }
  else if (newChar == '}' && this->rawInput[0] == '{')
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
