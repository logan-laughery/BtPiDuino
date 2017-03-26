#include "LedManager.h"
#include "Arduino.h"

LedManager::LedManager()
{
  pinMode(LED_BUILTIN, OUTPUT);
}

void LedManager::SetPinHigh()
{
  digitalWrite(LED_BUILTIN, HIGH);
}

void LedManager::SetPinLow()
{
  digitalWrite(LED_BUILTIN, LOW);
}
