import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/mongodb'
import Product from '../../../../lib/models/Product'
import { cookies } from 'next/headers'

// Protect this route
async function isAuthenticated() {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('admin_auth')
    return authCookie && authCookie.value === 'true'
}

export async function POST(request) {
    try {
        if (!(await isAuthenticated())) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        await dbConnect()
        const body = await request.json()

        // Validate essential fields
        if (!body.name || !body.slug || !body.category) {
            return NextResponse.json(
                { message: 'Name, Slug, and Category are required.' },
                { status: 400 }
            )
        }

        // Check for duplicate slug
        const existing = await Product.findOne({ slug: body.slug })
        if (existing) {
            return NextResponse.json(
                { message: 'A product with that slug already exists.' },
                { status: 400 }
            )
        }

        // Create and save
        const product = new Product(body)
        await product.save()

        return NextResponse.json(
            { message: 'Product created successfully', product },
            { status: 201 }
        )
    } catch (error) {
        console.error('Create product error:', error)
        return NextResponse.json(
            { message: error.message || 'Server Error' },
            { status: 500 }
        )
    }
}
