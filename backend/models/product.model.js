const mongoose = require('mongoose');


const VariantSchema = new mongoose.Schema({
    sku: String,
    size: String,
    color: String,
    price: Number,
    stock: { type: Number, default: 0 }
});


const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: String,
    brand: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    tags: [String],
    images: [String],
    variants: [VariantSchema],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number },
    totalStock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});


ProductSchema.index({ title: 'text', description: 'text' });


ProductSchema.pre('save', function (next) {
    // maintain totalStock
    this.totalStock = this.variants.reduce((s, v) => s + (v.stock || 0), 0);
    next();
});


module.exports = mongoose.model('Product', ProductSchema);