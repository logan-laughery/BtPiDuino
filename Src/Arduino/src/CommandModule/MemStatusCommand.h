#ifndef MEMSTATUSCOMMAND_H
#define MEMSTATUSCOMMAND_H

#include "CommandAbstract.h"

class MemStatusCommand : public CommandAbstract
{
  public:
    MemStatusCommand();
    void UpdateSettings(void);
    int FreeRam(void);
  private:
};

#endif
