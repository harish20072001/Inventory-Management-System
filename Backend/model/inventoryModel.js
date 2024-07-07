const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig');
 
const inventory = db.define('inventory', {
  item_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category:{
    type:DataTypes.STRING,
    allowNull: false
  },
  frequency:{
    type:DataTypes.STRING,
    allowNull: false
  },
  date_of_entry: {
    type: DataTypes.DATE,
    allowNull: false
  },
  threshold:{
    type: DataTypes.INTEGER,
    allowNull: false
  }

});
 
db.sync();

 
module.exports = inventory;