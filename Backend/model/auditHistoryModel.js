const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig');
const Inventory = require('./inventoryModel');
 
const AuditHistory = db.define('AuditHistory', {
  action: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  details: {
    type: DataTypes.STRING
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Assuming each audit history entry must be associated with an item
    references: {
      model: Inventory,
      key: 'id'
    }
  }
});
db.sync();
 
module.exports = AuditHistory;