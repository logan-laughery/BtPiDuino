#include "TimeManager.h"
#include "Arduino.h"

TimeManager::TimeManager()
{
}

unsigned long TimeManager::GetCurrentTime()
{
  return millis();
}

bool TimeManager::IntervalPassed(unsigned long intervalMillis, unsigned long lastMillis)
{
  bool intervalPassed = false;
  unsigned long currentMillis = this->GetCurrentTime();

  intervalPassed = (unsigned long)(currentMillis - lastMillis) >= intervalMillis;

  return intervalPassed;
}
