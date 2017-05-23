#ifndef GETSETTINGSCOMMAND_H
#define GETSETTINGSCOMMAND_H

#include "CommandAbstract.h"

class GetSettingsCommand : public CommandAbstract
{
  public:
    GetSettingsCommand();
    void UpdateSettings(void);
  private:
};

#endif
