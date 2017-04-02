#ifndef PUMPACTION_H
#define PUMPACTION_H

#include "ActionAbstract.h"

class PumpAction : public ActionAbstract
{
  public:
    PumpAction();
    void PerformAction(void);
  private:
    unsigned long lastCheck=0;
};

#endif
