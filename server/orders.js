const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id: {
        type: Number,
        required: true,
        unique: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    product_list: {
        type: String,
        required: true
    },
    total_cost: {
        type: String,
        required: true
    }
}, {
  collection: 'orders'
});

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;