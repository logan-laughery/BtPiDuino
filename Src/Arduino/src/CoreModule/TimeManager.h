#ifndef TIMEMANAGER_H
#define TIMEMANAGER_H

class TimeManager
{
  private:
    TimeManager();
    TimeManager(TimeManager const& copy); // Not implemented
    TimeManager& operator=(TimeManager const& copy); // Not implemented
  public:
    // Reset the timer if runtime exceeds 100 hours
    unsigned long ResetMillis = 360000000;
    static TimeManager& GetInstance()
    {
      static TimeManager instance;
      return instance;
    }
    unsigned long GetCurrentTime();
    bool IntervalPassed(unsigned long interval, unsigned long lastMillis);
};

#endif
