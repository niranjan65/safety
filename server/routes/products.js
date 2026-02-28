const router = require('express').Router()
const Product = require('../models/Product')

/* GET /api/products — list all (with optional ?category= filter) */
router.get('/', async (req, res) => {
    try {
        const filter = {}
        if (req.query.category) filter.category = req.query.category
        const products = await Product.find(filter).sort({ createdAt: -1 })
        res.json(products)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

/* GET /api/products/:slug — single product */
router.get('/:slug', async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
        if (!product) return res.status(404).json({ error: 'Product not found' })
        res.json(product)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
