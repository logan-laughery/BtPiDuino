
#include "GetSettingsCommand.h"
#include "Arduino.h"
#include "BluetoothManager.h"
#include "SerialManager.h"
#include "Settings.h"

GetSettingsCommand::GetSettingsCommand(): CommandAbstract()
{
}

void GetSettingsCommand::UpdateSettings()
{
  BluetoothManager& bluetoothManager = BluetoothManager::GetInstance();
  SerialManager& serialManager = SerialManager::GetInstance();
  Settings& settings = Settings::GetInstance();

  bluetoothManager.Write(String("{getsettings:") + String(settings.TargetTemp)
    + String("|") + String(settings.AutoTempControl) + String("|") + String(settings.ManualPumpOn) + String("}"));
  serialManager.Debug(String(String("Command: GetSettings - ") + String(settings.TargetTemp)
    + String("|") + String(settings.AutoTempControl) + String("|") + String(settings.ManualPumpOn) + String("}")));
}
