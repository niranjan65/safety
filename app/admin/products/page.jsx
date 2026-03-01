"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('/api/products')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch products')
                return res.json()
            })
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black font-[Outfit] mb-2">Products</h1>
                    <p className="text-text-secondary">Manage your product catalog.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-accent-yellow text-[#111] font-bold hover:bg-accent-yellow-hover transition-colors whitespace-nowrap"
                >
                    + Add New Product
                </Link>
            </div>

            {error && (
                <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    {error}
                </div>
            )}

            <div className="bg-bg-card border border-border-glass rounded-[24px] overflow-hidden">
                {loading ? (
                    <div className="p-10 text-center text-text-muted">Loading products...</div>
                ) : products.length === 0 ? (
                    <div className="p-10 text-center text-text-muted">
                        <p className="mb-4">No products found.</p>
                        <Link href="/admin/products/new" className="text-accent-yellow hover:underline">
                            Add your first product
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border-glass bg-white/[0.02]">
                                    <th className="p-4 text-sm font-semibold text-text-secondary">Product</th>
                                    <th className="p-4 text-sm font-semibold text-text-secondary">Category</th>
                                    <th className="p-4 text-sm font-semibold text-text-secondary">Status</th>
                                    <th className="p-4 text-sm font-semibold text-text-secondary text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id} className="border-b border-border-glass hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-[#111] overflow-hidden flex-shrink-0 border border-border-glass flex items-center justify-center">
                                                    {product.images && product.images[0] ? (
                                                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-text-muted text-xs">No img</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-text-primary">{product.name}</div>
                                                    <div className="text-xs text-text-muted mt-1 font-mono">{product.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 border-t-0">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/[0.06] text-text-secondary">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="p-4 border-t-0">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                                                <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                                                Active
                                            </span>
                                        </td>
                                        <td className="p-4 border-t-0 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/product/${product.slug}`}
                                                    target="_blank"
                                                    className="p-2 text-text-muted hover:text-accent-yellow transition-colors rounded-lg hover:bg-white/[0.04]"
                                                    title="View on site"
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                </Link>
                                                {/* Edit and Delete buttons can be added here later */}
                                                <button className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-white/[0.04]" title="Edit (Coming soon)">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
