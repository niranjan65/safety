import { NextResponse } from 'next/server'
import dbConnect from '../../../../../lib/mongodb'
import Product from '../../../../../lib/models/Product'
import { cookies } from 'next/headers'

// Protect this route
async function isAuthenticated() {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('admin_auth')
    return authCookie && authCookie.value === 'true'
}

// GET a single product by ID
export async function GET(request, { params }) {
    try {
        if (!(await isAuthenticated())) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        await dbConnect()
        const { id } = await params

        const product = await Product.findById(id)
        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 })
        }

        return NextResponse.json(product)
    } catch (error) {
        console.error('Get product error:', error)
        return NextResponse.json({ message: 'Server Error' }, { status: 500 })
    }
}

// UPDATE a product by ID
export async function PUT(request, { params }) {
    try {
        if (!(await isAuthenticated())) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        await dbConnect()
        const { id } = await params
        const body = await request.json()

        // Validate essential fields
        if (!body.name || !body.slug || !body.category) {
            return NextResponse.json(
                { message: 'Name, Slug, and Category are required.' },
                { status: 400 }
            )
        }

        // Check for duplicate slug (exclude current product)
        const existing = await Product.findOne({ slug: body.slug, _id: { $ne: id } })
        if (existing) {
            return NextResponse.json(
                { message: 'A product with that slug already exists.' },
                { status: 400 }
            )
        }

        const product = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Product updated successfully', product })
    } catch (error) {
        console.error('Update product error:', error)
        return NextResponse.json(
            { message: error.message || 'Server Error' },
            { status: 500 }
        )
    }
}

// DELETE a product by ID
export async function DELETE(request, { params }) {
    try {
        if (!(await isAuthenticated())) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        await dbConnect()
        const { id } = await params

        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Product deleted successfully' })
    } catch (error) {
        console.error('Delete product error:', error)
        return NextResponse.json({ message: 'Server Error' }, { status: 500 })
    }
}
