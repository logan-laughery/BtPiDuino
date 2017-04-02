#include "TempProbe.h"
#include "Arduino.h"
#include <OneWire.h>
#include <DallasTemperature.h>
#include "SerialManager.h"

TempProbe::TempProbe()
{
  this->Pin = 4;
  this->Wire = new OneWire(this->Pin);
  this->Sensor = new DallasTemperature(this->Wire);
}

float TempProbe::GetTemp()
{
  this->Sensor->requestTemperatures();
  float temp = this->Sensor->getTempFByIndex(0);
  return temp;
}
