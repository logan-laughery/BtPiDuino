#ifndef PINGCOMMAND_H
#define PINGCOMMAND_H

#include "CommandAbstract.h"

class PingCommand : public CommandAbstract
{
  public:
    PingCommand();
    void PerformAction(void);
  private:
    void Blink();
};

#endif
