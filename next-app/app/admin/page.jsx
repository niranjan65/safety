"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
    const [stats, setStats] = useState({ products: 0, categories: 0, quotes: 0, loading: true })

    useEffect(() => {
        // Fetch dashboard stats (optimistic mock fetching)
        Promise.all([
            fetch('/api/products').then(res => res.json()),
            fetch('/api/categories').then(res => res.json()),
            fetch('/api/quotes').then(res => res.json()).catch(() => [])
        ]).then(([prodData, catData, quoteData]) => {
            setStats({
                products: prodData?.length || 0,
                categories: catData?.length || 0,
                quotes: quoteData?.length || 0,
                loading: false
            })
        })
    }, [])

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-3xl font-black font-[Outfit] mb-2">Dashboard Overview</h1>
                <p className="text-text-secondary">Welcome back to the Sarda Industries admin portal.</p>
            </div>

            {stats.loading ? (
                <div className="text-text-muted">Loading statistics...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-bg-card border border-border-glass rounded-[20px] p-6 hover:border-accent-yellow/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-text-secondary">Total Products</h3>
                            <div className="w-10 h-10 rounded-full bg-accent-yellow/10 flex items-center justify-center text-accent-yellow">
                                📦
                            </div>
                        </div>
                        <div className="text-4xl font-black font-[Outfit]">{stats.products}</div>
                    </div>

                    <div className="bg-bg-card border border-border-glass rounded-[20px] p-6 hover:border-accent-yellow/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-text-secondary">Total Categories</h3>
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                📁
                            </div>
                        </div>
                        <div className="text-4xl font-black font-[Outfit]">{stats.categories}</div>
                    </div>

                    <div className="bg-bg-card border border-border-glass rounded-[20px] p-6 hover:border-accent-yellow/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-text-secondary">Quote Requests (RFQs)</h3>
                            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                                📋
                            </div>
                        </div>
                        <div className="text-4xl font-black font-[Outfit]">{stats.quotes}</div>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-bg-card border border-border-glass rounded-[24px] p-8">
                <h2 className="text-xl font-bold font-[Outfit] mb-6">Quick Actions</h2>
                <div className="flex gap-4">
                    <Link
                        href="/admin/products/new"
                        className="px-6 py-3 rounded-xl bg-accent-yellow text-[#111] font-bold hover:bg-accent-yellow-hover transition-colors"
                    >
                        + Add New Product
                    </Link>
                    <Link
                        href="/admin/products"
                        className="px-6 py-3 rounded-xl border border-border-glass hover:bg-white/[0.04] transition-colors font-medium text-text-primary"
                    >
                        View All Products
                    </Link>
                </div>
            </div>
        </div>
    )
}
