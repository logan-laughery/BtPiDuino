#ifndef RELAYMANAGER_H
#define RELAYMANAGER_H

class RelayManager
{
  private:
    RelayManager();
    RelayManager(RelayManager const& copy); // Not implemented
    RelayManager& operator=(RelayManager const& copy); // Not implemented
  public:
    int PinForOne;
    int PinForTwo;
    static RelayManager& GetInstance()
    {
      static RelayManager instance;
      return instance;
    }
    void SetOneOn();
    void SetOneOff();
    void SetTwoOn();
    void SetTwoOff();
};

#endif
