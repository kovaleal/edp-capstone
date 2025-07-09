const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        unique: true
    },
    product_name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    discounted_price: {
        type: String,
        required: true
    },
    actual_price: {
        type: String,
        required: true
    },
    discount_percentage: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    rating_count: {
        type: String,
        required: true
    },
    about_product: {
        type: String,
        required: true,
        select: false
    },
    user_id: {
        type: String,
        required: true,
        select: false
    },
    user_name: {
        type: String,
        required: true,
        select: false
    },
    review_id: {
        type: String,
        required: true,
        select: false
    },
    review_title: {
        type: String,
        required: true,
        select: false
    },
    review_content: {
        type: String,
        required: true,
        select: false
    },
    img_link: {
        type: String,
        required: true
    },
    product_link: {
        type: String,
        required: true,
        select: false
    }
}, {
  collection: 'products'
});

const Catalog = mongoose.model('Catalog', catalogSchema);

module.exports = Catalog;