#ifndef COMMANDDESERIALIZER_H
#define COMMANDDESERIALIZER

#include "CommandAbstract.h"
#include "Arduino.h"

class CommandDeserializer
{
  private:
    CommandDeserializer();
    CommandDeserializer(CommandDeserializer const& copy); // Not implemented
    CommandDeserializer& operator=(CommandDeserializer const& copy); // Not implemented
    String ExtractArgument(String rawCommand);
  public:
    static CommandDeserializer& GetInstance()
    {
      static CommandDeserializer instance;
      return instance;
    }
    CommandAbstract * DeserializeCommand(char rawCommand[]);
};

#endif
