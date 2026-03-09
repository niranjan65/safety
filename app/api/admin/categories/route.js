import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/mongodb'
import Category from '../../../../lib/models/Category'

// GET all categories (admin)
export async function GET() {
    try {
        await dbConnect()
        const categories = await Category.find().sort({ createdAt: -1 })
        return NextResponse.json(categories)
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json({ message: 'Server Error' }, { status: 500 })
    }
}

// POST - create a new category
export async function POST(request) {
    try {
        await dbConnect()
        const body = await request.json()

        if (!body.name || !body.slug) {
            return NextResponse.json(
                { message: 'Name and Slug are required.' },
                { status: 400 }
            )
        }

        // Check for duplicate slug
        const existing = await Category.findOne({ slug: body.slug })
        if (existing) {
            return NextResponse.json(
                { message: 'A category with this slug already exists.' },
                { status: 409 }
            )
        }

        const category = await Category.create({
            name: body.name,
            slug: body.slug,
            image: body.image || '',
            subtitle: body.subtitle || '',
        })

        return NextResponse.json(category, { status: 201 })
    } catch (error) {
        console.error('Error creating category:', error)
        return NextResponse.json({ message: 'Server Error' }, { status: 500 })
    }
}
