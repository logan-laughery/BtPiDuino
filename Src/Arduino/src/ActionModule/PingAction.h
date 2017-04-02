#ifndef PINGACTION_H
#define PINGACTION_H

#include "ActionAbstract.h"

class PingAction : public ActionAbstract
{
  public:
    PingAction();
    void PerformAction(void);
  private:
    int pingCount=0;
    unsigned long lastPing=0;
    bool ledOn=false;
    void Blink();
    void Reset();
};

#endif
