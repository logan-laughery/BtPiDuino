
#include "StateCommand.h"
#include "SerialManager.h"
#include "Arduino.h"
#include "Settings.h"

StateCommand::StateCommand(String argument): CommandAbstract()
{
  this->ParseArgument(argument);
}

void StateCommand::PerformAction()
{
  SerialManager& serialManager = SerialManager::GetInstance();
  serialManager.Debug(String("Executing: State Action -> Argument=")
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
}

void StateCommand::ParseArgument(String argument)
{
  this->desiredState = argument.toInt();
}
