import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import Product from '../../../lib/models/Product'

export async function GET(request) {
    try {
        await dbConnect()
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')

        const filter = category ? { category } : {}
        const products = await Product.find(filter).sort({ createdAt: -1 })

        return NextResponse.json(products)
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json({ error: 'Server Error' }, { status: 500 })
    }
}
