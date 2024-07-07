const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig');
 
const Daily = db.define('Daily', {
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
  date_of_entry: {
    type: DataTypes.DATE,
    allowNull: false
  }

});
 
db.sync();

 
module.exports = Daily;