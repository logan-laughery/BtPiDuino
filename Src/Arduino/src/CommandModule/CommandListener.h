#ifndef COMMANDLISTENER_H
#define COMMANDLISTENER_H

#include "CommandAbstract.h"

class CommandListener
{
  private:
    char rawInput[20];
    int rawCharCount;
    bool IsFullCommand(char newChar);
    void ResetRawCommand();
  public:
    CommandListener();
    CommandAbstract * GetCommand();
    char Test();
};

#endif
