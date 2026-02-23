'use strict';

const express = require('express');
const router = express.Router();

// Mock inventory data
let inventory = [
    { id: 1, name: 'Item A', quantity: 100, price: 10.0 },
    { id: 2, name: 'Item B', quantity: 200, price: 20.0 },
];

// GET all inventory items
router.get('/', (req, res) => {
    res.json(inventory);
});

// GET a single inventory item by ID
router.get('/:id', (req, res) => {
    const item = inventory.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
});

// POST a new inventory item
router.post('/', (req, res) => {
    const { name, quantity, price } = req.body;
    const newItem = {
        id: inventory.length + 1,
        name,
        quantity,
        price,
    };
    inventory.push(newItem);
    res.status(201).json(newItem);
});

// PUT update an inventory item
router.put('/:id', (req, res) => {
    const item = inventory.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    const { name, quantity, price } = req.body;
    item.name = name;
    item.quantity = quantity;
    item.price = price;
    res.json(item);
});

// DELETE an inventory item
router.delete('/:id', (req, res) => {
    const itemIndex = inventory.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found');
    inventory.splice(itemIndex, 1);
    res.status(204).send();
});

// Calculate total inventory valuation
router.get('/valuation', (req, res) => {
    const totalValuation = inventory.reduce((total, item) => total + (item.quantity * item.price), 0);
    res.json({ totalValuation });
});

module.exports = router;
