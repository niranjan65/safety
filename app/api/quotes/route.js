import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import QuoteRequest from '../../../lib/models/QuoteRequest'
import { sendQuoteEmail } from '../../../lib/email'

export async function POST(request) {
    try {
        await dbConnect()
        const body = await request.json()

        const { customerName, email, phone, productName } = body
        if (!customerName || !email || !phone || !productName) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Save to database
        const newQuote = new QuoteRequest(body)
        const savedQuote = await newQuote.save()

        // Send email notification (await so Vercel doesn't exit before email is sent)
        try {
            await sendQuoteEmail(body)
        } catch (emailErr) {
            console.error('Email send error:', emailErr.message)
        }

        return NextResponse.json({ message: 'Quotation request submitted successfully', quoteId: savedQuote._id }, { status: 201 })
    } catch (error) {
        console.error('Submit RFQ Error:', error)
        return NextResponse.json({ message: 'Server error processing request' }, { status: 500 })
    }
}

export async function GET() {
    try {
        await dbConnect()
        const quotes = await QuoteRequest.find().sort({ createdAt: -1 })
        return NextResponse.json(quotes)
    } catch (error) {
        return NextResponse.json({ message: 'Server error fetching quotes' }, { status: 500 })
    }
}
