const mongoose = require('mongoose')

const quoteRequestSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productSlug: String,
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: String,
    quantity: String,
    size: String,
    message: String,
    status: { type: String, enum: ['pending', 'responded', 'closed'], default: 'pending' },
}, { timestamps: true })

module.exports = mongoose.models.QuoteRequest || mongoose.model('QuoteRequest', quoteRequestSchema)
