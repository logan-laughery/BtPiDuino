#include "TimeManager.h"
#include "Arduino.h"

TimeManager::TimeManager()
{
}

unsigned long TimeManager::GetCurrentTime()
{
  return millis();
}
