
#include "PumpStatusCommand.h"
#include "Arduino.h"
#include "State.h"
#include "BluetoothManager.h"
#include "SerialManager.h"

PumpStatusCommand::PumpStatusCommand(): CommandAbstract()
{
}

void PumpStatusCommand::UpdateSettings()
{
  BluetoothManager& bluetoothManager = BluetoothManager::GetInstance();
  SerialManager& serialManager = SerialManager::GetInstance();
  State& state = State::GetInstance();
  String output = String("{pumpstatus:") + String(state.PumpOn) + String("}");
  char outArray[20];
  output.toCharArray(outArray, 20);
  bluetoothManager.Write(outArray);
  serialManager.Debug(String(String("Command: PumpStatus - ") + String(state.PumpOn)));
}
