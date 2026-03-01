import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
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

        const formData = await request.formData()
        const file = formData.get('file')

        if (!file) {
            return NextResponse.json({ message: 'No file received' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Generate unique filename to prevent overwriting
        const timestamp = Date.now()
        const extension = path.extname(file.name) || '.jpg'
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').replace(extension, '')
        const fileName = `${safeName}-${timestamp}${extension}`

        // Save to the public/images folder
        const uploadDir = path.join(process.cwd(), 'public/images')
        const filePath = path.join(uploadDir, fileName)

        console.log(`Saving image to: ${filePath}`)
        await writeFile(filePath, buffer)

        return NextResponse.json({
            success: true,
            url: `/images/${fileName}`
        })
    } catch (error) {
        console.error('Image upload error:', error)
        return NextResponse.json(
            { message: 'Server error saving image' },
            { status: 500 }
        )
    }
}
