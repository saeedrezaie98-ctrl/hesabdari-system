const express = require('express');
const router = express.Router();

let invoices = [];
let invoiceIdCounter = 1000;

router.get('/', (req, res) => {
    res.json(invoices);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const invoice = invoices.find(inv => inv.id === parseInt(id));
    if (invoice) {
        res.json(invoice);
    } else {
        res.status(404).json({ error: 'Invoice not found' });
    }
});

router.get('/customer/:customerId', (req, res) => {
    const { customerId } = req.params;
    const customerInvoices = invoices.filter(inv => inv.customer_id === parseInt(customerId));
    res.json(customerInvoices);
});

router.post('/', (req, res) => {
    const { customer_id, items, notes } = req.body;
    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'Invoice must have at least one item' });
    }
    const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const newInvoice = {
        id: invoiceIdCounter++,
        customer_id,
        items,
        totalAmount,
        notes,
        status: 'pending',
        created_at: new Date(),
        paid_at: null
    };
    invoices.push(newInvoice);
    res.status(201).json(newInvoice);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const index = invoices.findIndex(inv => inv.id === parseInt(id));
    if (index !== -1) {
        const updatedData = req.body;
        if (updatedData.items) {
            updatedData.totalAmount = updatedData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        }
        invoices[index] = { ...invoices[index], ...updatedData };
        res.json(invoices[index]);
    } else {
        res.status(404).json({ error: 'Invoice not found' });
    }
});

router.patch('/:id/pay', (req, res) => {
    const { id } = req.params;
    const index = invoices.findIndex(inv => inv.id === parseInt(id));
    if (index !== -1) {
        invoices[index].status = 'paid';
        invoices[index].paid_at = new Date();
        res.json(invoices[index]);
    } else {
        res.status(404).json({ error: 'Invoice not found' });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = invoices.findIndex(inv => inv.id === parseInt(id));
    if (index !== -1) {
        invoices.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Invoice not found' });
    }
});

module.exports = router;