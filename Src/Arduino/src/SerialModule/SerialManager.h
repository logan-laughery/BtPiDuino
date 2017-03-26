#ifndef SERIALMANAGER_H
#define SERIALMANAGER_H

#include "Arduino.h"

class SerialManager
{

  // Singleton discussion here: http://stackoverflow.com/questions/1008019/c-singleton-design-pattern
  private:
    SerialManager();
    SerialManager(SerialManager const& copy); // Not implemented
    SerialManager& operator=(SerialManager const& copy); // Not implemented

  public:
    static SerialManager& GetInstance()
    {
      static SerialManager instance;
      return instance;
    }
    void Write(char output[]);
    void Write(char output);
    char Read();
    void Debug(char output[]);
    void Debug(char output);
    void Debug(String string);
};

#endif
