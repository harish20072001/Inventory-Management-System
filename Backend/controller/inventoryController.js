const Inventory = require('../model/inventoryModel');
const logger = require('../Logger/logger');
const { Op } = require('sequelize');
const AuditHistoryModel = require('../model/auditHistoryModel');
const { log } = require('winston');
 
const InventoryController = {
  getAllItems: async (req, res) => {
    try {
      const { category, frequency, searchTerm, unit } = req.query;
      let whereClause = {};
      if (category) {
        whereClause.category = category;
      }
      if (frequency) {
        whereClause.frequency = frequency;
      }
      if (searchTerm) {
        whereClause.item_name = { [Op.like]: `%${searchTerm}%` };
      }
      if (unit) {
        whereClause.unit = unit; // Add unit filtering
      }
 
      const items = await Inventory.findAll({ where: whereClause });
      logger.info('Fetched Inventory Items');
      res.json(items);
 
    } catch (error) {
      logger.error('Error fetching items:', error);
      res.status(500).json({ error: 'Error fetching items' });
    }
  },
 
  getItemById: async (req, res) => {
    try {
      const id  = req.query.id;
      logger.debug(`Fetching Items with ID: ${id}`);
      const Item = await Inventory.findByPk(id);
      if (!Item) {
        logger.warn(`Item with ID ${id} not found`);
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(Item);
    } catch (error) {
      logger.error('Error fetching Items', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
 
  createItem: async (req, res) => {
    const { item_name, quantity, unit, category, frequency, date_of_entry, threshold } = req.body;
    try {
        // Check if an item with the same name already exists
        const existingItem = await Inventory.findOne({ where : {item_name}});
        
        // If an item with the same name exists, return an error
        if (existingItem) {
            return res.status(400).json({ error: 'Item with the same name already exists' });
        }

        // If not, create a new item
        const newItem = await Inventory.create({ item_name, quantity, unit, category, frequency, date_of_entry, threshold });
        logger.info('Created new Item:', newItem);
        res.status(201).json(newItem);
    } catch (error) {
        logger.error('Error creating item:', error);
        res.status(500).json({ error: 'Error creating item' });
    }
}
,
 
  updateItem: async (req, res) => {
    try {
      const id = req.query.id;
      logger.info(`Updating user with Id : ${id}`);
      const { item_name, quantity, unit, frequency ,threshold} = req.body;
 
      // Check if an item with the same name and quantity already exists
      const existingItem = await Inventory.findOne({ where: { item_name, quantity, unit, frequency,threshold } });
      if (existingItem) {
        logger.warn(`Item with the same name and quantity already exists`);
        return res.status(400).json({ error: 'Item with the same name and quantity already exists' });
      }
 
      const [updatedRowsCount, updatedItem] = await Inventory.update(
        { item_name, quantity, unit, frequency },
        { where: { id }, returning: true }
      );
      if (updatedRowsCount === 0) {
        logger.warn(`Item with id ${id} not found`);
        return res.status(404).json({ error: 'Item not found' });
      }
      logger.info(`Item with Id ${id} updated successfully`);
      console.log('Inventory item updated successfully');
      res.status(200).send('Updated data successfully').json(updatedItem[0]);
    } catch (error) {
      logger.error('Error updating Inventory item:', error);
      res.status(500).send('Internal Server Error');
    }
  },
 
  deleteItem: async (req, res) => {
    try {
      const id = req.query.id;
      // console.log("hello",id);
      console.log("hello")
      logger.info(`Deleting iten with id : ${id}`)
      const DeleteRows = await Inventory.destroy({ where: { id } });
      if (DeleteRows === 0) {
        logger.warn(`item with id ${id} not found`)
        return res.status(404).json({ error: 'user not found' })
      }
      logger.info(`item with id ${id} deleted successfully`)
      res.status(200).send("Deleted data successfully");
    } catch (error) {
      console.error("Error deleting Inventory item:", error);
      res.status(500).send("Internal Server Error");
    }
  },
 
  getItemByName: async (req, res) => {
    try {
      const { item_name } = req.params;
 
      const item = await Inventory.findOne({ where: { item_name} });
 
      if (!item) {
        logger.info(`Item with name ${item_name} not found`); // Corrected itemName to item_name
        return res.status(404).json({ error: 'Item not found' });
      }
 
      res.json(item);
    } catch (error) {
      logger.error('Error fetching item by name:', error);
      res.status(500).json({ error: 'Error fetching item by name' });
    }
  }
 
 
};
 
 
module.exports = InventoryController;