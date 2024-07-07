const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const inventoryRoutes = require('./routes/inventoryRoutes');
const requestRoutes = require('./routes/requestRoutes');
const dailyUsageRoutes = require("./routes/dailyUsageRoutes")
const sequelize = require('./config/dbConfig');
const logger = require('./Logger/logger')
const auditRoutes = require('./routes/auditHistoryRoutes')
 
 
 
// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
  next()
});

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended : false}));

app.use('/inventory', inventoryRoutes);
app.use('/request', requestRoutes);
app.use('/daily', dailyUsageRoutes)
app.use('/api', auditRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch(err => {
    console.error("Error synchronizing database:", err);
  });
  
  
const port = process.env.PORT; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
