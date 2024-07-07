const Request = require('../model/requestModel');
const logger = require('../Logger/logger')
 
const RequestController = {
  RequestedItems: async (req, res) => {
    try {
      const items = await Request.findAll();
      logger.info('Fetched all Requestd Items')
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
      const Item = await Request.findByPk(id);
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
 
  createRequest :async (req, res) => {
    const { item_name, quantity, unit,category, date_of_entry } = req.body;
    try {
      const newItem = await Request.create({ item_name, quantity, unit, category,date_of_entry });
      logger.info('created new Item:',newItem)
      res.status(201).json(newItem);
    } catch (error) {
      logger.error('Error creating item:', error);
      res.status(500).json({ error: 'Error creating item' });
    }
  },

  CreateBulk : async (req, res) => {
    try {
      const requestedItems = req.body;
   
      if (!Array.isArray(requestedItems)) {
        return res.status(400).json({ error: "Invalid request format" });
      }
   
      const newItems = requestedItems.map(item => ({
        item_name: item.item_name,
        quantity: item.quantity,
        unit: item.unit,
        category: item.category,
        date_of_entry: item.date_of_entry
      }));
   
      const createdItems = await Request.bulkCreate(newItems);
   
      logger.info(createdItems);
      res.status(201).json(createdItems);
    } catch (error) {
      logger.error("Error adding inventory items:", error);
      res.status(500).json({ error: "Error adding inventory items" });
    }
  },

  updateItem : async (req, res) => {
    try {
      const id = req.params.id;
      logger.info(`Updating user with Id : ${id}`)
      const { status , comments} = req.body;
      const[ updatedRowsCount, updatedItem ] = await Request.update({ status , comments},
               { where: { id },
              returning: true
            });
      if (updatedRowsCount === 0 ){
        logger.warn(`Item with id ${id} not found`);
        return res.status(404).json({error : 'user not found'});
      }
      logger.info(`Item with Id ${id} updated successfully`)
      console.log("Inventory item updated successfully");
      res.status(200).send("Updated data successfully").json(updatedItem[0]);
    } catch (error) {
        logger.error("Error updating Inventory item:", error);
        res.status(500).send("Internal Server Error");
    }
  },

 
}
 
module.exports = RequestController ;