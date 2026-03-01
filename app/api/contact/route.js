import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import Contact from '../../../lib/models/Contact'

export async function POST(request) {
    try {
        await dbConnect()
        const body = await request.json()

        const { name, email, message } = body
        if (!name || !email || !message) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            )
        }

        const newContact = new Contact(body)
        const savedContact = await newContact.save()

        return NextResponse.json({ message: 'Contact inquiry submitted successfully', contactId: savedContact._id }, { status: 201 })
    } catch (error) {
        console.error('Submit Contact Error:', error)
        return NextResponse.json({ message: 'Server error processing request' }, { status: 500 })
    }
}
