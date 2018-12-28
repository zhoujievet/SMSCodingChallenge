const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/item.controller');

// Get list of Items
router.get( '/', ItemController.getItems);

// Get one spare by cuid
router.get('/:id', ItemController.getItem);

// Add a new Item
router.post('/', ItemController.saveItem);

// Update a Item
router.put('/', ItemController.updateItem);

// Delete a Item
router.delete('/:id', ItemController.deleteItem);

module.exports = router;