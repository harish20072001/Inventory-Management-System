const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/dbConfig');
 
const Request = db.define('Request', {
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
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_of_entry: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending"
  },
  comments:{
    type: DataTypes.STRING,
    allowNull: true
  }
});
 
db.sync();
 
module.exports = Request;