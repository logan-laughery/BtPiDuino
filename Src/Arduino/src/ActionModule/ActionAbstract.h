#ifndef ACTIONABSTRACT_H
#define ACTIONABSTRACT_H

#include "Arduino.h"

class ActionAbstract
{
  public:
    ActionAbstract();
    virtual void PerformAction() =0;
};

#endif
