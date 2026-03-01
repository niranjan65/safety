"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })

            if (res.ok) {
                router.push('/admin') // Redirect to dashboard
            } else {
                const data = await res.json()
                setError(data.message || 'Login failed')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-bg-dark flex items-center justify-center p-6 bg-[url('/images/bulk-order-banner.png')] bg-cover bg-center bg-no-repeat relative">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-md bg-bg-card border border-border-glass rounded-[24px] overflow-hidden shadow-2xl">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent-yellow to-accent-orange rounded-[16px] flex items-center justify-center text-[#111] mb-4">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        </div>
                        <h1 className="text-2xl font-black font-[Outfit] text-text-primary">Admin Portal</h1>
                        <p className="text-text-muted mt-2 text-sm">Sign in to manage Sarda Industries</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-text-secondary mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                className="w-full px-4 py-3 bg-white/[0.04] border border-border-glass rounded-xl text-text-primary outline-none focus:border-accent-yellow transition-colors"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl font-bold bg-accent-yellow text-[#111] hover:bg-accent-yellow-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Authenticating...' : 'Sign In ->'}
                        </button>
                    </form>
                </div>

                <div className="bg-[#111] px-8 py-4 text-center">
                    <p className="text-text-muted text-xs">If you forgot your password, please check your environment variables.</p>
                </div>
            </div>
        </div>
    )
}
