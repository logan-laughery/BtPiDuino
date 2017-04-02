#ifndef COMMANDABSTRACT_H
#define COMMANDABSTRACT_H

#include "Arduino.h"

class CommandAbstract
{
  public:
    CommandAbstract();
    virtual void UpdateSettings() =0;
};

#endif
