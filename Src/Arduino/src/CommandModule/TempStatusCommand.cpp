
#include "TempStatusCommand.h"
#include "Arduino.h"
#include "State.h"
#include "BluetoothManager.h"
#include "SerialManager.h"

TempStatusCommand::TempStatusCommand(): CommandAbstract()
{
}

void TempStatusCommand::UpdateSettings()
{
  BluetoothManager& bluetoothManager = BluetoothManager::GetInstance();
  SerialManager& serialManager = SerialManager::GetInstance();
  State& state = State::GetInstance();
  String output = String("{tempstatus:") + String(state.CurrentTemp) + String("}");
  char outArray[20];
  output.toCharArray(outArray, 20);
  bluetoothManager.Write(outArray);
  serialManager.Debug(String(String("Command: TempStatus - ") + String(state.CurrentTemp)));
}
