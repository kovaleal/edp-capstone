require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT;
const mongo_url = process.env.MONGO_URI;

const app = express();

const Product = require('./products');
//TBD transactions
//const Transaction = require('./transactions');

// Middleware
app.use(cors());
app.use(express.json());
//app.use(express.static(path.join(__dirname, './public/dist')));

// Connect to MongoDB
mongoose.connect(mongo_url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Routes
app.get('/api/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findOne({ product_id: id });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(`Error fetching product id=${id}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});