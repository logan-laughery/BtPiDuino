#include "ActionManager.h"
#include "PingAction.h"
#include "TempAction.h"
#include "PumpAction.h"

ActionManager::ActionManager()
{
  this->Ping = new PingAction();
  this->Temp = new TempAction();
  this->Pump = new PumpAction();
}

void ActionManager::PerformActions()
{
  this->Ping->PerformAction();
  this->Temp->PerformAction();
  this->Pump->PerformAction();
}
