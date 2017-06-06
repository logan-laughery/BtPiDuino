
#include "GetStateCommand.h"
#include "Arduino.h"
#include "BluetoothManager.h"
#include "SerialManager.h"
#include "Settings.h"
#include "State.h"

GetStateCommand::GetStateCommand(): CommandAbstract()
{
}

void GetStateCommand::UpdateSettings()
{
  BluetoothManager& bluetoothManager = BluetoothManager::GetInstance();
  SerialManager& serialManager = SerialManager::GetInstance();
  State& state = State::GetInstance();

  bluetoothManager.Write(String("{gs:") + String(state.CurrentTemp) + String("|")
     + String(state.PumpOn) + String("}"));
}
