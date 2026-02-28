const router = require('express').Router()
const Contact = require('../models/Contact')

/* POST /api/contact — submit a contact inquiry */
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'name, email, and message are required' })
        }

        const contact = await Contact.create({ name, email, phone, subject, message })

        res.status(201).json({ success: true, contactId: contact._id, message: 'Inquiry submitted successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
