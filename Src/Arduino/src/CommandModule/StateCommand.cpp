
#include "StateCommand.h"
#include "SerialManager.h"
#include "Arduino.h"
#include "Settings.h"
#include "BluetoothManager.h"

StateCommand::StateCommand(String argument): CommandAbstract()
{
  this->ParseArgument(argument);
}

void StateCommand::UpdateSettings()
{
  SerialManager& serialManager = SerialManager::GetInstance();
  serialManager.Debug(String("Setting: State Command -> Argument=")
    + String(this->desiredState));

  Settings& settings = Settings::GetInstance();
  // Manual - Set Pump On
  if(this->desiredState == 1)
  {
    settings.AutoTempControl = false;
    settings.ManualPumpOn = true;
  }
  // Manual - Set Pump Off
  else if(this->desiredState == 2)
  {
    settings.AutoTempControl = false;
    settings.ManualPumpOn = false;
  }
  else
  {
    settings.AutoTempControl = true;
    settings.ManualPumpOn = false;
  }

  BluetoothManager& bluetoothManager = BluetoothManager::GetInstance();
  bluetoothManager.Write(String("{state:") + String(this->desiredState) + String("}"));
}

void StateCommand::ParseArgument(String argument)
{
  this->desiredState = argument.toInt();
}
