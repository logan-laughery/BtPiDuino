'use strict';
module.exports = function(sequelize, DataTypes) {
  var Device = sequelize.define('Device', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    lastConnected: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Device.hasMany(models.Action);
        Device.hasMany(models.Log);
        Device.hasOne(models.Settings);
        Device.hasMany(models.Status);
      }
    }
  });
  return Device;
};
