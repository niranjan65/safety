const router = require('express').Router()
const QuoteRequest = require('../models/QuoteRequest')

/* POST /api/quotes — submit a quotation request */
router.post('/', async (req, res) => {
    try {
        const { productName, productSlug, customerName, email, phone, company, quantity, size, message } = req.body

        if (!productName || !customerName || !email || !phone) {
            return res.status(400).json({ error: 'productName, customerName, email, and phone are required' })
        }

        const quote = await QuoteRequest.create({
            productName, productSlug, customerName, email, phone, company, quantity, size, message
        })

        res.status(201).json({ success: true, quoteId: quote._id, message: 'Quotation request submitted successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

/* GET /api/quotes — list all (admin use) */
router.get('/', async (_req, res) => {
    try {
        const quotes = await QuoteRequest.find().sort({ createdAt: -1 })
        res.json(quotes)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
