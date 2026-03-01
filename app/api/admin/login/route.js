import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request) {
    try {
        const { password } = await request.json()
        const correctPassword = process.env.ADMIN_PASSWORD || 'sarda123'

        if (password === correctPassword) {
            // Set secure HTTP-only cookie
            const cookieStore = await cookies()
            cookieStore.set('admin_auth', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            })

            return NextResponse.json({ success: true })
        }

        return NextResponse.json(
            { success: false, message: 'Invalid password' },
            { status: 401 }
        )
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
