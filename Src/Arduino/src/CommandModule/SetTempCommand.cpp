
#include "SetTempCommand.h"
#include "Arduino.h"
#include "Settings.h"
#include "SerialManager.h"
#include "BluetoothManager.h"

SetTempCommand::SetTempCommand(String argument): CommandAbstract()
{
  this->ParseArgument(argument);
}

void SetTempCommand::UpdateSettings()
{
  Settings& settings = Settings::GetInstance();
  settings.TargetTemp = desiredTemp;

  SerialManager& serialManager = SerialManager::GetInstance();
  serialManager.Debug(String(String("Command: SetTemp - ") + String(settings.TargetTemp)));

  BluetoothManager& bluetoothManager = BluetoothManager::GetInstance();
  bluetoothManager.Write(String("{temp:") + String(settings.TargetTemp) + String("}"));
}

void SetTempCommand::ParseArgument(String argument)
{
  this->desiredTemp = argument.toFloat();
}
