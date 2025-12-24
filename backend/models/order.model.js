const mongoose = require('mongoose');


const OrderItem = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    variantSku: String,
    qty: Number,
    price: Number
});


const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [OrderItem],
    shippingAddress: Object,
    status: { type: String, default: 'pending', enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded'] },
    total: Number,
    payment: { provider: String, providerPaymentId: String, status: String },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', OrderSchema);