#ifndef SETTINGS_H
#define SETTINGS_H

class Settings
{
  private:
    Settings();
    Settings(Settings const& copy); // Not implemented
    Settings& operator=(Settings const& copy); // Not implemented
  public:
    float TargetTemp=0;
    bool AutoTempControl=true;
    bool ManualPumpOn=false;
    bool Ping=false;
    static Settings& GetInstance()
    {
      static Settings instance;
      return instance;
    }
};

#endif
