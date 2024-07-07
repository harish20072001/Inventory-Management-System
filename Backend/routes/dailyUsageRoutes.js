const express = require('express');
const router = express.Router();
const DailyUsageController = require('../controller/dailyUsageController');


router.post('/addItem', DailyUsageController.createRequest)
router.get('/getItems',DailyUsageController.getItems)

module.exports = router;