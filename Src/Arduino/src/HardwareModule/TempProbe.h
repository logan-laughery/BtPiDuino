#ifndef TEMPPROBE_H
#define TEMPPROBE_H

#include <OneWire.h>
#include <DallasTemperature.h>

class TempProbe
{
  private:
    TempProbe();
    TempProbe(TempProbe const& copy); // Not implemented
    TempProbe& operator=(TempProbe const& copy); // Not implemented
  public:
    int Pin=4;
    DallasTemperature* Sensor;
    OneWire* Wire;
    static TempProbe& GetInstance()
    {
      static TempProbe instance;
      return instance;
    }
    float GetTemp();
};
#endif
