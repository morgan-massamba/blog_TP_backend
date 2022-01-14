const express = require('express');
const verifyToken = require('../middleware/verifyToken');

const {
    getAllItems,
    getSingleItem,
    createItem,
    updateSingleItem,
    deleteSingleItem,
} = require('../controllers/item');
const router = express.Router();

router.post('/items', verifyToken, createItem);
router.get('/items', verifyToken, getAllItems);
router.get('/items/:id', verifyToken, getSingleItem);
router.put('/items/:id', verifyToken, updateSingleItem);
router.delete('/items/:id', verifyToken, deleteSingleItem);

module.exports = router;
