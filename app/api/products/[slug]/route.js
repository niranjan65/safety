import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/mongodb'
import Product from '../../../../lib/models/Product'

export async function GET(request, { params }) {
    try {
        await dbConnect()
        const slug = (await params).slug

        const product = await Product.findOne({ slug })
        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 })
        }

        return NextResponse.json(product)
    } catch (error) {
        console.error('Error fetching product:', error)
        return NextResponse.json({ error: 'Server Error' }, { status: 500 })
    }
}
