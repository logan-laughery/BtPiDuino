#ifndef GETSTATECOMMAND_H
#define GETSTATECOMMAND_H

#include "CommandAbstract.h"

class GetStateCommand : public CommandAbstract
{
  public:
    GetStateCommand();
    void UpdateSettings(void);
  private:
};

#endif
