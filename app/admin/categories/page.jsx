"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminCategories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [deleting, setDeleting] = useState(null)

    // New category form state
    const [showForm, setShowForm] = useState(false)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        image: '',
        subtitle: '',
    })

    // Edit state
    const [editingId, setEditingId] = useState(null)
    const [editData, setEditData] = useState({ name: '', slug: '', image: '', subtitle: '' })

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/admin/categories')
            const data = await res.json()
            if (Array.isArray(data)) setCategories(data)
        } catch (err) {
            setError('Failed to load categories')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    // Auto-generate slug from name
    const handleNameChange = (value) => {
        const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        setFormData({ ...formData, name: value, slug })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setError('')
        setSuccess('')

        try {
            const res = await fetch('/api/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message || 'Failed to create category')
            }

            setSuccess('Category created successfully!')
            setFormData({ name: '', slug: '', image: '', subtitle: '' })
            setShowForm(false)
            fetchCategories()
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id, name) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) return

        setDeleting(id)
        setError('')
        setSuccess('')

        try {
            const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message || 'Failed to delete category')
            }
            setSuccess('Category deleted successfully!')
            fetchCategories()
        } catch (err) {
            setError(err.message)
        } finally {
            setDeleting(null)
        }
    }

    const startEdit = (cat) => {
        setEditingId(cat._id)
        setEditData({ name: cat.name, slug: cat.slug, image: cat.image || '', subtitle: cat.subtitle || '' })
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditData({ name: '', slug: '', image: '', subtitle: '' })
    }

    const handleEditSave = async (id) => {
        setError('')
        setSuccess('')

        try {
            const res = await fetch(`/api/admin/categories/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message || 'Failed to update category')
            }

            setSuccess('Category updated successfully!')
            setEditingId(null)
            fetchCategories()
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black font-[Outfit]">Categories</h1>
                    <p className="text-text-secondary mt-1">Manage your product categories.</p>
                </div>
                <button
                    onClick={() => { setShowForm(!showForm); setError(''); setSuccess('') }}
                    className="px-6 py-3 rounded-xl bg-accent-yellow text-[#111] font-bold hover:bg-accent-yellow-hover transition-colors flex items-center gap-2"
                >
                    {showForm ? (
                        <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            Cancel
                        </>
                    ) : (
                        <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                            Add Category
                        </>
                    )}
                </button>
            </div>

            {/* Messages */}
            {error && (
                <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-between">
                    <span>{error}</span>
                    <button onClick={() => setError('')} className="text-red-400 hover:text-red-300 ml-4">✕</button>
                </div>
            )}
            {success && (
                <div className="p-4 mb-6 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-between">
                    <span>{success}</span>
                    <button onClick={() => setSuccess('')} className="text-green-400 hover:text-green-300 ml-4">✕</button>
                </div>
            )}

            {/* Add Category Form */}
            {showForm && (
                <div className="bg-bg-card border border-border-glass rounded-[24px] p-6 mb-8 animate-in">
                    <h2 className="text-xl font-bold font-[Outfit] mb-5">New Category</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-text-secondary mb-2">Category Name *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#111] border border-border-glass rounded-xl text-text-primary outline-none focus:border-accent-yellow transition-colors"
                                    placeholder="e.g. Safety Goggles"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text-secondary mb-2">URL Slug *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#111] border border-border-glass rounded-xl text-text-muted outline-none focus:border-accent-yellow transition-colors font-mono text-sm"
                                    placeholder="e.g. safety-goggles"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-text-secondary mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#111] border border-border-glass rounded-xl text-text-primary outline-none focus:border-accent-yellow transition-colors"
                                    placeholder="e.g. /images/safety-goggles.png"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text-secondary mb-2">Subtitle</label>
                                <input
                                    type="text"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#111] border border-border-glass rounded-xl text-text-primary outline-none focus:border-accent-yellow transition-colors"
                                    placeholder="e.g. Brand A · Brand B"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-8 py-3 rounded-xl bg-accent-yellow text-[#111] font-bold hover:bg-accent-yellow-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {saving ? 'Creating...' : 'Create Category'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Categories Table */}
            {loading ? (
                <div className="text-text-muted text-center py-16">Loading categories...</div>
            ) : categories.length === 0 ? (
                <div className="text-center py-20 bg-bg-card border border-border-glass rounded-[24px]">
                    <div className="text-5xl mb-4">📁</div>
                    <h3 className="text-xl font-bold font-[Outfit] mb-2">No categories yet</h3>
                    <p className="text-text-secondary mb-6">Add your first category to organize products.</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-6 py-3 rounded-xl bg-accent-yellow text-[#111] font-bold hover:bg-accent-yellow-hover transition-colors"
                    >
                        + Add First Category
                    </button>
                </div>
            ) : (
                <div className="bg-bg-card border border-border-glass rounded-[24px] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border-glass">
                                    <th className="p-4 text-sm font-semibold text-text-secondary text-left">Image</th>
                                    <th className="p-4 text-sm font-semibold text-text-secondary text-left">Name</th>
                                    <th className="p-4 text-sm font-semibold text-text-secondary text-left">Slug</th>
                                    <th className="p-4 text-sm font-semibold text-text-secondary text-left">Subtitle</th>
                                    <th className="p-4 text-sm font-semibold text-text-secondary text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((cat) => (
                                    <tr key={cat._id} className="border-b border-border-glass/50 hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4">
                                            {cat.image ? (
                                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#111] border border-border-glass">
                                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 rounded-xl bg-[#111] border border-border-glass flex items-center justify-center text-text-muted text-lg">
                                                    📁
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {editingId === cat._id ? (
                                                <input
                                                    type="text"
                                                    value={editData.name}
                                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                                    className="w-full px-3 py-2 bg-[#111] border border-border-glass rounded-lg text-text-primary outline-none focus:border-accent-yellow text-sm"
                                                />
                                            ) : (
                                                <span className="font-semibold text-text-primary">{cat.name}</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {editingId === cat._id ? (
                                                <input
                                                    type="text"
                                                    value={editData.slug}
                                                    onChange={(e) => setEditData({ ...editData, slug: e.target.value })}
                                                    className="w-full px-3 py-2 bg-[#111] border border-border-glass rounded-lg text-text-muted outline-none focus:border-accent-yellow text-sm font-mono"
                                                />
                                            ) : (
                                                <span className="font-mono text-sm text-text-muted">{cat.slug}</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {editingId === cat._id ? (
                                                <input
                                                    type="text"
                                                    value={editData.subtitle}
                                                    onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
                                                    className="w-full px-3 py-2 bg-[#111] border border-border-glass rounded-lg text-text-primary outline-none focus:border-accent-yellow text-sm"
                                                />
                                            ) : (
                                                <span className="text-sm text-text-secondary">{cat.subtitle || '—'}</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {editingId === cat._id ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleEditSave(cat._id)}
                                                            className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs font-semibold hover:bg-green-500/20 transition-colors"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={cancelEdit}
                                                            className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-text-secondary text-xs font-semibold hover:bg-white/[0.08] transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => startEdit(cat)}
                                                            className="px-3 py-1.5 rounded-lg bg-accent-yellow/10 text-accent-yellow text-xs font-semibold hover:bg-accent-yellow/20 transition-colors"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(cat._id, cat.name)}
                                                            disabled={deleting === cat._id}
                                                            className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-semibold hover:bg-red-500/20 disabled:opacity-50 transition-colors"
                                                        >
                                                            {deleting === cat._id ? '...' : 'Delete'}
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
