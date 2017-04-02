
#include "PingCommand.h"
#include "SerialManager.h"
#include "Arduino.h"
#include "LedManager.h"
#include "Settings.h"

PingCommand::PingCommand(): CommandAbstract()
{
}

void PingCommand::UpdateSettings()
{
  SerialManager& serialManager = SerialManager::GetInstance();
  serialManager.Debug(String("Command: Ping"));
  Settings& setting = Settings::GetInstance();
  setting.Ping = true;
}
