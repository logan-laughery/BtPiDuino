'use strict';
var models = require( "../models/index.js");
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable(models.Device.tableName, models.Device.attributes)
    .then(() => queryInterface
      .createTable(models.Action.tableName, models.Action.attributes))
    .then(() => queryInterface
      .createTable(models.Log.tableName, models.Log.attributes))
    .then(() => queryInterface
      .createTable(models.Settings.tableName, models.Settings.attributes))
    .then(() => queryInterface
      .createTable(models.Status.tableName, models.Status.attributes));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Devices')
      .then(() => queryInterface.dropTable('Actions'))
      .then(() => queryInterface.dropTable('Log'))
      .then(() => queryInterface.dropTable('Settings'))
      .then(() => queryInterface.dropTable('Status'));
  }
};
