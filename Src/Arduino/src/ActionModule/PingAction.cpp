#include "PingAction.h"
#include "SerialManager.h"
#include "Arduino.h"
#include "LedManager.h"
#include "TimeManager.h"
#include "Settings.h"

PingAction::PingAction(): ActionAbstract()
{
}

void PingAction::PerformAction()
{
  Settings& settings = Settings::GetInstance();

  if(settings.Ping) {
    if(this->pingCount == 0) {
      SerialManager& serialManager = SerialManager::GetInstance();
      serialManager.Debug(String("Action: Ping"));
    }
    this->Blink();
  }
}

void PingAction::Blink()
{
  TimeManager& timeManager = TimeManager::GetInstance();
  bool readyForBlink = timeManager.IntervalPassed(500, this->lastPing);

  if(this->lastPing > 0 && !readyForBlink) {
    return;
  }

  // Pinging
  LedManager& ledManager = LedManager::GetInstance();
  this->lastPing = timeManager.GetCurrentTime();
  this->pingCount++;

  if (this->ledOn) {
    ledManager.SetPinLow();
  } else {
    ledManager.SetPinHigh();
  }

  this->ledOn = !this->ledOn;
  if(this->pingCount >= 10) {
    this->Reset();
    //ledManager.SetPinLow();
  }
}

void PingAction::Reset()
{
  Settings& settings = Settings::GetInstance();
  settings.Ping = false;
  this->pingCount = 0;
  this->lastPing = 0;
}
