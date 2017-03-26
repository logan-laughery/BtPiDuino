#ifndef TIMEMANAGER_H
#define TIMEMANAGER_H

class TimeManager
{
  private:
    TimeManager();
    TimeManager(TimeManager const& copy); // Not implemented
    TimeManager& operator=(TimeManager const& copy); // Not implemented
  public:
    unsigned long PreviousMillis = 0;
    static TimeManager& GetInstance()
    {
      static TimeManager instance;
      return instance;
    }
    unsigned long GetCurrentTime();
};

#endif
