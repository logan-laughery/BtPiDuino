#ifndef TEMPSTATUSCOMMAND_H
#define TEMPSTATUSCOMMAND_H

#include "CommandAbstract.h"

class TempStatusCommand : public CommandAbstract
{
  public:
    TempStatusCommand();
    void UpdateSettings(void);
    // int FreeRam(void);
  private:
};

#endif
