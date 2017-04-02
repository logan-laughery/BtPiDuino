#ifndef PUMPSTATUSCOMMAND_H
#define PUMPSTATUSCOMMAND_H

#include "CommandAbstract.h"

class PumpStatusCommand : public CommandAbstract
{
  public:
    PumpStatusCommand();
    void UpdateSettings(void);
  private:
};

#endif
