const express = require('express');
const router = express.Router();

let repairOrders = []; // In-memory storage for demonstration

// GET all repair orders
router.get('/orders', (req, res) => {
    res.json(repairOrders);
});

// GET a specific repair order by ID
router.get('/orders/:id', (req, res) => {
    const order = repairOrders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found');
    res.json(order);
});

// POST a new repair order
router.post('/orders', (req, res) => {
    const { description, status } = req.body;
    const newOrder = {
        id: repairOrders.length + 1,
        description,
        status: status || 'pending', // Default status
    };
    repairOrders.push(newOrder);
    res.status(201).json(newOrder);
});

// PUT to update a repair order
router.put('/orders/:id', (req, res) => {
    const order = repairOrders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found');
    const { description, status } = req.body;
    order.description = description;
    order.status = status;
    res.json(order);
});

// DELETE a specific repair order
router.delete('/orders/:id', (req, res) => {
    const orderIndex = repairOrders.findIndex(o => o.id === parseInt(req.params.id));
    if (orderIndex === -1) return res.status(404).send('Order not found');
    repairOrders.splice(orderIndex, 1);
    res.status(204).send();
});

// PATCH to update the status of a repair order
router.patch('/orders/:id/status', (req, res) => {
    const order = repairOrders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found');
    const { status } = req.body;
    order.status = status;
    res.json(order);
});

module.exports = router;