#ifndef TEMPACTION_H
#define TEMPACTION_H

#include "ActionAbstract.h"

class TempAction : public ActionAbstract
{
  public:
    TempAction();
    void PerformAction(void);
  private:
    void RegulateTemp(float currentTemp);
    unsigned long lastRead=0;
};

#endif
