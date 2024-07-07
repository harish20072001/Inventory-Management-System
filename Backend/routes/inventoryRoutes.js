const express = require('express');
const router = express.Router();
const InventoryController = require('../controller/inventoryController');
 
router.post('/addItems', InventoryController.createItem);
router.get('/getItems', InventoryController.getAllItems);
router.get('/getById', InventoryController.getItemById);
router.put('/updateItem', InventoryController.updateItem);
router.delete('/deleteItem', InventoryController.deleteItem);
router.get('getByName/:item_name', InventoryController.getItemByName);
 
module.exports = router;