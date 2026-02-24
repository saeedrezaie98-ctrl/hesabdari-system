const express = require('express');
const router = express.Router();

// Fake in-memory database
let customers = [];
let nextId = 1;

// GET all customers
router.get('/', (req, res) => {
    res.json(customers);
});

// GET single customer
router.get('/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
});

// POST create new customer
router.post('/', (req, res) => {
    const { name, phone, address } = req.body;

    if (!name || !phone)
        return res.status(400).json({ message: 'Name and phone are required' });

    const newCustomer = {
        id: nextId++,
        name,
        phone,
        address: address || ''
    };

    customers.push(newCustomer);
    res.status(201).json(newCustomer);
});

// PUT update customer
router.put('/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    const { name, phone, address } = req.body;

    customer.name = name ?? customer.name;
    customer.phone = phone ?? customer.phone;
    customer.address = address ?? customer.address;

    res.json(customer);
});

// DELETE customer
router.delete('/:id', (req, res) => {
    const index = customers.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Customer not found' });

    customers.splice(index, 1);
    res.status(204).send();
});

module.exports = router;