#ifndef ACTIONMANAGER_H
#define ACTIONMANAGER_H

#include "PingAction.h"
#include "TempAction.h"
#include "PumpAction.h"

class ActionManager
{
  private:
    PingAction* Ping;
    TempAction* Temp;
    PumpAction* Pump;
  public:
    ActionManager();
    void PerformActions();
};

#endif
