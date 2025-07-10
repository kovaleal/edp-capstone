require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT;
const mongo_url = process.env.MONGO_URI;

const app = express();

const Orders = require('./orders');
const Products = require('./products');

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
// Fetch all past orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Orders.find().select('-_id -__v'); 
        if (!orders) {
            return res.status(404).json({ error: 'Past orders unavailable' });
        }
        res.json(orders);
    } catch (error) {
        console.error('Error fetching past orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch past order by order ID
app.get('/api/orders/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const order = await Orders.findOne({ order_id: id }).select('-_id -__v');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error(`Error fetching order id=${id}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add new order to database
app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = new Orders(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(`Error adding order:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch entire catalog (lightweight)
app.get('/api/products/catalog', async (req, res) => {
    const filter = '-about_product -user_id -user_name -review_id -review_title -review_content -product_link';
    try {
        const catalog = await Products.find().select(filter); 
        if (!catalog) {
            return res.status(404).json({ error: 'Catalog unavailable' });
        }
        res.json(catalog);
    } catch (error) {
        console.error('Error fetching product catalog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch 'num' products from catalog
app.get('/api/products/catalog/:num', async (req, res) => {
    const num = req.params.num;
    const filter = '-about_product -user_id -user_name -review_id -review_title -review_content -product_link';
    try {
        const catalog = await Products.find().select(filter).sort({'_id': 1}).limit(num);
        if (!catalog) {
            return res.status(404).json({ error: 'Catalog unavailable' });
        }
        res.json(catalog);
    } catch (error) {
        console.error('Error fetching product catalog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch item listing by product ID
app.get('/api/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Products.findOne({ product_id: id }).select('-_id -__v');
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