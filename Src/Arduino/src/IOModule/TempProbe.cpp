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
  SerialManager& serialManager = SerialManager::GetInstance();
  //sensors.requestTemperatures();
  // this->Pin = 4;
  // OneWire oneWire(this->Pin);
  // DallasTemperature temp(&oneWire);
  //serialManager.Debug(String(sensors.getTempCByIndex(0)) + String("C"));
  this->Sensor->requestTemperatures();
  serialManager.Debug(String(this->Sensor->getTempFByIndex(0)) + String("F"));
  return 0;
}
