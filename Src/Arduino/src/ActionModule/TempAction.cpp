#include "TempAction.h"
#include "SerialManager.h"
#include "Arduino.h"
#include "LedManager.h"
#include "TimeManager.h"
#include "TempProbe.h"
#include "State.h"
#include "Settings.h"


TempAction::TempAction(): ActionAbstract()
{
}

void TempAction::PerformAction()
{
  State& state = State::GetInstance();
  TimeManager& timeManager = TimeManager::GetInstance();
  bool readyToReadTemp = timeManager.IntervalPassed(500, this->lastRead);

  if(this->lastRead > 0 && !readyToReadTemp) {
    return;
  }

  TempProbe& tempProbe = TempProbe::GetInstance();
  float temp = tempProbe.GetTemp();
  state.CurrentTemp = temp;
  this->RegulateTemp(temp);
}

void TempAction::RegulateTemp(float currentTemp)
{
  Settings& settings = Settings::GetInstance();
  State& state = State::GetInstance();

  if(!settings.AutoTempControl) {
    state.PumpOn = settings.ManualPumpOn;
    return;
  }

  float tempBuffer = 0.5;

  // If the temp is warmer than the desired temp
  if(currentTemp > (settings.TargetTemp + tempBuffer)) {
    state.PumpOn = false;
  } else if(currentTemp < (settings.TargetTemp - tempBuffer)) {
    state.PumpOn = true;
  }
}
