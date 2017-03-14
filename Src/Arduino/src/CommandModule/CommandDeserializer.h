#ifndef COMMANDDESERIALIZER_H
#define COMMANDDESERIALIZER

#include "CommandAbstract.h"

class CommandDeserializer
{
  private:
    CommandDeserializer();
    CommandDeserializer(CommandDeserializer const& copy); // Not implemented
    CommandDeserializer& operator=(CommandDeserializer const& copy); // Not implemented

  public:
    static CommandDeserializer& GetInstance()
    {
      static CommandDeserializer instance;
      return instance;
    }
    CommandAbstract * DeserializeCommand(char rawCommand[]);
};

#endif
