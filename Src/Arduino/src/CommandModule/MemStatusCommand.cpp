
#include "MemStatusCommand.h"
#include "Arduino.h"
#include "BluetoothManager.h"
#include "SerialManager.h"

MemStatusCommand::MemStatusCommand(): CommandAbstract()
{
}

int MemStatusCommand::FreeRam ()
{
  extern int __heap_start, *__brkval;
  int v;
  return (int) &v - (__brkval == 0 ? (int) &__heap_start : (int) __brkval);
}

void MemStatusCommand::UpdateSettings()
{
  BluetoothManager& bluetoothManager = BluetoothManager::GetInstance();
  SerialManager& serialManager = SerialManager::GetInstance();
  bluetoothManager.Write(String("{memstatus:") + String(this->FreeRam()) + String("}"));
  serialManager.Debug(String(String("Command: MemStatus - ") + String(this->FreeRam())));
}
