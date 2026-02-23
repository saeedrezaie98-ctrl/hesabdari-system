const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection setup
const pool = new Pool({
    user: 'your_username',  // Replace with your database username
    host: 'localhost',      // Replace with your database host
    database: 'your_database_name', // Replace with your database name
    password: 'your_password',  // Replace with your database password
    port: 5432,
});

// Middleware
app.use(express.json());

// API routes for customer management
app.use('/api/customers', require('./routes/customers'));  
// API routes for repair orders
app.use('/api/orders', require('./routes/orders'));
// API routes for invoicing
app.use('/api/invoicing', require('./routes/invoicing'));
// API routes for inventory
app.use('/api/inventory', require('./routes/inventory'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
