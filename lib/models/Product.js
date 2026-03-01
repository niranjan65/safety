const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    images: [String],
    shortDescription: String,
    description: String,
    highlights: [{ icon: String, text: String }],
    specs: [{ key: String, value: String }],
    badge: { type: String, enum: ['bestseller', 'new', null], default: null },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    sizes: [String],
    applications: [String],
    inStock: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema)
