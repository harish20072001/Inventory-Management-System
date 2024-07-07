const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false,
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch(err => {
    console.error("Error synchronizing database:", err);
  });

module.exports = sequelize;