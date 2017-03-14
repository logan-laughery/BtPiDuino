#ifndef COMMANDABSTRACT_H
#define COMMANDABSTRACT_H

class CommandAbstract
{

  public:
    CommandAbstract();
    virtual char* GetArgument() =0;
    virtual void UpdateSettings(char value[]) =0;
};

#endif
