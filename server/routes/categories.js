const router = require('express').Router()
const Category = require('../models/Category')

/* GET /api/categories — list all */
router.get('/', async (_req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: 1 })
        res.json(categories)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
