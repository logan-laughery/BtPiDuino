#include "PumpAction.h"
#include "SerialManager.h"
#include "Arduino.h"
#include "LedManager.h"
#include "TimeManager.h"
#include "RelayManager.h"
#include "State.h"

PumpAction::PumpAction(): ActionAbstract()
{
}

void PumpAction::PerformAction()
{
  State& state = State::GetInstance();
  TimeManager& timeManager = TimeManager::GetInstance();
  bool minRunTimePassed = timeManager.IntervalPassed(1000, this->lastCheck);

  if(this->lastCheck > 0 && !minRunTimePassed) {
    return;
  }

  this->lastCheck = timeManager.GetCurrentTime();
  RelayManager& relayManager = RelayManager::GetInstance();

  if(state.PumpOn) {
    relayManager.SetTwoOn();
  } else {
    relayManager.SetTwoOff();
  }
}
