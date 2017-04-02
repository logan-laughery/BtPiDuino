#ifndef SETTEMPCOMMAND_H
#define SETTEMPCOMMAND_H

#include "CommandAbstract.h"
#include "Arduino.h"

class SetTempCommand : public CommandAbstract
{
  public:
    SetTempCommand(String argument);
    void UpdateSettings(void);
  private:
    void ParseArgument(String argument);
    float desiredTemp;
};

#endif
