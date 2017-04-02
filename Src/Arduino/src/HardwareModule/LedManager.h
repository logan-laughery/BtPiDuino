#ifndef LEDMANAGER_H
#define LEDMANAGER_H

class LedManager
{
  private:
    LedManager();
    LedManager(LedManager const& copy); // Not implemented
    LedManager& operator=(LedManager const& copy); // Not implemented
  public:
    static LedManager& GetInstance()
    {
      static LedManager instance;
      return instance;
    }
    void SetPinHigh();
    void SetPinLow();
};

#endif
