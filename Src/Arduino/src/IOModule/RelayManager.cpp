#include "RelayManager.h"
#include "Arduino.h"

RelayManager::RelayManager()
{
  this->PinForOne = A0;
  this->PinForTwo = A1;
  pinMode(PinForOne, OUTPUT);
  pinMode(PinForTwo, OUTPUT);
  digitalWrite(this->PinForOne, HIGH);
  digitalWrite(this->PinForTwo, HIGH);
}

void RelayManager::SetOneOn()
{
  digitalWrite(this->PinForOne, LOW);
}

void RelayManager::SetOneOff()
{
  digitalWrite(this->PinForOne, HIGH);
}

void RelayManager::SetTwoOn()
{
  digitalWrite(this->PinForTwo, LOW);
}

void RelayManager::SetTwoOff()
{
  digitalWrite(this->PinForTwo, HIGH);
}
