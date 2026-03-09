import { NextResponse } from 'next/server'
import dbConnect from '../../../../../lib/mongodb'
import Category from '../../../../../lib/models/Category'

// DELETE a category by ID
export async function DELETE(request, { params }) {
    try {
        await dbConnect()
        const { id } = await params

        const deleted = await Category.findByIdAndDelete(id)
        if (!deleted) {
            return NextResponse.json({ message: 'Category not found' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Category deleted successfully' })
    } catch (error) {
        console.error('Error deleting category:', error)
        return NextResponse.json({ message: 'Server Error' }, { status: 500 })
    }
}

// PUT - update a category by ID
export async function PUT(request, { params }) {
    try {
        await dbConnect()
        const { id } = await params
        const body = await request.json()

        if (!body.name || !body.slug) {
            return NextResponse.json(
                { message: 'Name and Slug are required.' },
                { status: 400 }
            )
        }

        const updated = await Category.findByIdAndUpdate(
            id,
            {
                name: body.name,
                slug: body.slug,
                image: body.image || '',
                subtitle: body.subtitle || '',
            },
            { new: true }
        )

        if (!updated) {
            return NextResponse.json({ message: 'Category not found' }, { status: 404 })
        }

        return NextResponse.json(updated)
    } catch (error) {
        console.error('Error updating category:', error)
        return NextResponse.json({ message: 'Server Error' }, { status: 500 })
    }
}
