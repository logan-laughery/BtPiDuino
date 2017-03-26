
#include "PingCommand.h"
#include "SerialManager.h"
#include "Arduino.h"
#include "LedManager.h"

PingCommand::PingCommand(): CommandAbstract()
{
}

void PingCommand::PerformAction()
{
  SerialManager& serialManager = SerialManager::GetInstance();
  serialManager.Debug(String("Executing: Ping Action"));

  for(int i = 0; i < 10; i++)
  {
    this->Blink();
  }
}

void PingCommand::Blink()
{
  LedManager& ledManager = LedManager::GetInstance();
  ledManager.SetPinHigh();
  delay(500);
  ledManager.SetPinLow();
  delay(500);
}
