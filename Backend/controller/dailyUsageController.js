const Daily = require('../model/dailyUsageModel');
const Inventory = require('../model/inventoryModel');
const logger = require('../Logger/logger')
 
const dailyUsageController = {
  getItems: async (req, res) => {
    try {
      const items = await Daily.findAll();
      logger.info('Fetched all daily Items')
      res.json(items);
    } catch (error) {
      logger.error('Error fetching items:', error);
      res.status(500).json({ error: 'Error fetching items' });
    }
  },
  
  getItemById: async (req, res) => {
    try {
      const { id } = req.params;
      logger.debug(`Fetching Items with ID: ${id}`);
      const Item = await Daily.findByPk(id);
      if(!Item) {
        logger.warn(`Item with ID ${id} not found`);
        return res.status(404).json({error: 'Item not found'});
      }
      res.json(Item);
    } catch(error) {
      logger.error('Error fetvhing Items', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  },
 
  createRequest: async (req, res) => {
    const { item_name, quantity, unit, category, date_of_entry } = req.body;
    try {
        // Create new item in Daily model
        const newItem = await Daily.create({ item_name, quantity, unit, category, date_of_entry });

        // Decrease quantity in inventory
        let inventoryItem = await Inventory.findOne({ where: { item_name } });
        if (inventoryItem) {
            inventoryItem.quantity -= quantity;
            await inventoryItem.save();
        }
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error creating item:', error); // Log detailed error message
        res.status(500).json({ error: 'Error creating item' });
    }
},

}
 
module.exports = dailyUsageController ;