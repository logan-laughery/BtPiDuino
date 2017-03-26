#ifndef STATECOMMAND_H
#define STATECOMMAND_H

#include "CommandAbstract.h"
#include "Arduino.h"

class StateCommand : public CommandAbstract
{
  private:
    int desiredState;
    void ParseArgument(String argument);
  public:
    StateCommand(String state);
    void PerformAction(void);
};

#endif
