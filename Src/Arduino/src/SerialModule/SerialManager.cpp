#include "SerialManager.h"
#include "Arduino.h"
#include <SoftwareSerial.h>

#define DEBUG true

SerialManager::SerialManager()
{
  Serial.begin(19200);
  Serial.println("Started: Serial Manager");
}

char SerialManager::Read()
{
  // Read from serial monitor if available
  if (Serial.available())
  {
      return Serial.read();
  }
  return (char) 0;
}

void SerialManager::Write(char output[])
{
  // Write to the serial monitor
  Serial.write(output);
}

void SerialManager::Write(char output)
{
  // Write to the serial monitor
  Serial.write(output);
}

void SerialManager::Debug(char output)
{
  if (DEBUG) {
    Serial.write(output);
  }
}

void SerialManager::Debug(char output[])
{
  if (DEBUG) {
    Serial.write(output);
  }
}

void SerialManager::Debug(String string)
{
  if (DEBUG) {
    Serial.println(string);
  }
}
