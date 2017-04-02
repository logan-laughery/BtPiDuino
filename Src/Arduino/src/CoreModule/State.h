#ifndef STATE_H
#define STATE_H

class State
{
  private:
    State();
    State(State const& copy); // Not implemented
    State& operator=(State const& copy); // Not implemented
  public:
    float CurrentTemp;
    bool PumpOn;
    static State& GetInstance()
    {
      static State instance;
      return instance;
    }
};

#endif
