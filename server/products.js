const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
        type: Double,
        required: true
    },
    rating_count: {
        type: String,
        required: true
    },
    about_product: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    review_id: {
        type: String,
        required: true
    },
    review_title: {
        type: String,
        required: true
    },
    review_content: {
        type: String,
        required: true
    },
    img_link: {
        type: String,
        required: true
    },
    product_link: {
        type: String,
        required: true
    }
}, {
  collection: 'products'
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;