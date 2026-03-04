import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { cookies } from 'next/headers'

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

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

        const formData = await request.formData()
        const file = formData.get('file')

        if (!file) {
            return NextResponse.json({ message: 'No file received' }, { status: 400 })
        }

        // Convert file to base64 data URI for Cloudinary upload
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = buffer.toString('base64')
        const dataUri = `data:${file.type};base64,${base64}`

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataUri, {
            folder: 'safety-products',
            resource_type: 'image',
        })

        return NextResponse.json({
            success: true,
            url: result.secure_url
        })
    } catch (error) {
        console.error('Image upload error:', error)
        return NextResponse.json(
            { message: `Upload failed: ${error.message}` },
            { status: 500 }
        )
    }
}
