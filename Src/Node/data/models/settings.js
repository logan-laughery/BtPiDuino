'use strict';
module.exports = function(sequelize, DataTypes) {
  var Settings = sequelize.define('Settings', {
    temperature: DataTypes.DECIMAL,
    pumpState: DataTypes.ENUM('auto', 'on', 'off')
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Settings.belongsTo(models.Device, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Settings;
};
