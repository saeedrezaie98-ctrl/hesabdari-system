const express = require('express');
const router = express.Router();

// Sample data array to represent the customer data
let customers = [];

// GET all customers
router.get('/', (req, res) => {
    res.json(customers);
});

// POST a new customer
router.post('/', (req, res) => {
    const newCustomer = req.body;
    customers.push(newCustomer);
    res.status(201).json(newCustomer);
});

// PUT update an existing customer
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const index = customers.findIndex(customer => customer.id === parseInt(id));
    if (index !== -1) {
        customers[index] = { ...customers[index], ...req.body };
        res.json(customers[index]);
    } else {
        res.status(404).send('Customer not found');
    }
});

// DELETE a customer
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = customers.findIndex(customer => customer.id === parseInt(id));
    if (index !== -1) {
        customers.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Customer not found');
    }
});

module.exports = router;