require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const productRoutes = require('./routes/products')
const categoryRoutes = require('./routes/categories')
const quoteRoutes = require('./routes/quotes')
const contactRoutes = require('./routes/contact')

const app = express()
const PORT = process.env.PORT || 5000

/* ─── Middleware ─── */
app.use(cors())
app.use(express.json())

/* ─── Routes ─── */
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/quotes', quoteRoutes)
app.use('/api/contact', contactRoutes)

/* ─── Health check ─── */
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

/* ─── Connect to MongoDB & start server ─── */
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB')
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message)
        process.exit(1)
    })
