
#include "TempStatusCommand.h"
#include "Arduino.h"
#include "State.h"
#include "BluetoothManager.h"
#include "SerialManager.h"

TempStatusCommand::TempStatusCommand(): CommandAbstract()
{
}


// int TempStatusCommand::FreeRam ()
// {
//   extern int __heap_start, *__brkval;
//   int v;
//   return (int) &v - (__brkval == 0 ? (int) &__heap_start : (int) __brkval);
// }


void TempStatusCommand::UpdateSettings()
{
  BluetoothManager& bluetoothManager = BluetoothManager::GetInstance();
  SerialManager& serialManager = SerialManager::GetInstance();
  State& state = State::GetInstance();
  bluetoothManager.Write(String("{tempstatus:") + String(state.CurrentTemp) + String("}"));
  //bluetoothManager.Write(String("{tempstatus:") + String(this->FreeRam()) + String("}"));
  serialManager.Debug(String(String("Command: TempStatus - ") + String(state.CurrentTemp)));
}
