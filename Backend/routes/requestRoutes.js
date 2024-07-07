const express = require('express');
const router = express.Router();
const requestController = require('../controller/requestController');
const verifyToken = require('../jwt/middleware');
const generateToken = require('../jwt/token');
 
router.post('/addItems', requestController.createRequest);
router.get('/getItems', requestController.RequestedItems);
router.post('/addBulk', requestController.CreateBulk);
router.put('/updateItem/:id', requestController.updateItem);
router.get('/getById/:id',verifyToken,requestController.getItemById);

router.post('/login', (req, res) => {
  const user = { id: 123, username: 'example_user' }; // Example user object
 
    // Generate token
  const token = generateToken(user);
 
    // Send token to the client
  res.json({ token });
});

module.exports = router;