"use client"
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AddProduct() {
    const router = useRouter()
    const fileInputRef = useRef(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [categories, setCategories] = useState([])

    // Image upload state
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState('')
    const [uploadingImage, setUploadingImage] = useState(false)

    // Form data state
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        category: '',
        shortDescription: '',
        description: '',
        badge: 'none',
        sizes: '',
        applications: '',
        images: [] // Array of image URLs
    })

    // Dynamic lists state
    const [highlights, setHighlights] = useState([{ icon: '✨', text: '' }])
    const [specs, setSpecs] = useState([{ key: '', value: '' }])

    useEffect(() => {
        // Fetch categories for the dropdown
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCategories(data)
                    if (data.length > 0) {
                        setFormData(prev => ({ ...prev, category: data[0].slug }))
                    }
                }
            })
            .catch(err => console.error("Failed to load categories", err))
    }, [])

    // Auto-generate slug from name
    const handleNameChange = (e) => {
        const name = e.target.value
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        setFormData({ ...formData, name, slug })
    }

    // Handle Image Selection
    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Quick validation
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file (PNG, JPG, JPEG)')
            return
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError('Image must be less than 5MB')
            return
        }

        setSelectedFile(file)
        setPreviewUrl(URL.createObjectURL(file))
        setError('')
    }

    // Handle local image upload to public/images via API
    const uploadImage = async () => {
        if (!selectedFile) return null

        setUploadingImage(true)
        const uploadData = new FormData()
        uploadData.append('file', selectedFile)

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: uploadData
            })

            if (!res.ok) throw new Error('Failed to upload image')

            const data = await res.json()
            return data.url // e.g., /images/filename.jpg
        } catch (err) {
            console.error(err)
            setError('Image upload failed. Check the server console.')
            return null
        } finally {
            setUploadingImage(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // 1. Upload image first if one is selected
            let uploadedImageUrl = null
            if (selectedFile) {
                uploadedImageUrl = await uploadImage()
                if (!uploadedImageUrl) {
                    throw new Error('Image upload failed, stopping product creation.')
                }
            }

            // 2. Prepare the final product payload
            const payload = {
                ...formData,
                badge: formData.badge === 'none' ? null : formData.badge,
                // Convert comma-separated strings to arrays
                sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
                applications: formData.applications.split('\n').map(a => a.trim()).filter(Boolean),
                // Filter out empty highlights/specs
                highlights: highlights.filter(h => h.icon && h.text),
                specs: specs.filter(s => s.key && s.value),
                images: uploadedImageUrl ? [uploadedImageUrl] : ['/images/placeholder.png']
            }

            // 3. Save to MongoDB
            const res = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message || 'Failed to create product')
            }

            // Success!
            router.push('/admin/products')
            router.refresh()
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }

    // --- Helpers for dynamic lists ---
    const handleHighlightChange = (index, field, value) => {
        const newHighlights = [...highlights]
        newHighlights[index][field] = value
        setHighlights(newHighlights)
    }
    const addHighlight = () => setHighlights([...highlights, { icon: '✨', text: '' }])
    const removeHighlight = (index) => setHighlights(highlights.filter((_, i) => i !== index))

    const handleSpecChange = (index, field, value) => {
        const newSpecs = [...specs]
        newSpecs[index][field] = value
        setSpecs(newSpecs)
    }
    const addSpec = () => setSpecs([...specs, { key: '', value: '' }])
    const removeSpec = (index) => setSpecs(specs.filter((_, i) => i !== index))

    return (
        <div className="pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="w-10 h-10 rounded-full bg-white/[0.04] border border-border-glass flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-white/[0.08] transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </Link>
                <div>
                    <h1 className="text-3xl font-black font-[Outfit]">Add New Product</h1>
                    <p className="text-text-secondary">Create a new product listing in your catalog.</p>
                </div>
            </div>

            {error && (
                <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-bg-card border border-border-glass rounded-[24px] p-6 space-y-5">
                        <h2 className="text-xl font-bold font-[Outfit] border-b border-border-glass pb-4 mb-4">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-text-secondary mb-2">Product Name *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={handleNameChange}
                                    className="w-full px-4 py-3 bg-[#111] border border-border-glass rounded-xl text-text-primary outline-none focus:border-accent-yellow transition-colors"
                                    placeholder="e.g. Premium Safety Shoes"
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
                                    placeholder="e.g. premium-safety-shoes"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-text-secondary mb-2">Category *</label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#111] border border-border-glass rounded-xl text-text-primary outline-none focus:border-accent-yellow transition-colors"
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categories.map(c => (
                                        <option key={c.slug} value={c.slug}>{c.name}</option>
                                    ))}
                                    {categories.length === 0 && <option value="safety-shoes">Safety Shoes</option>}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text-secondary mb-2">Badge</label>
                                <select
                                    value={formData.badge}
                                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#111] border border-border-glass rounded-xl text-text-primary outline-none focus:border-accent-yellow transition-colors"
                                >
                                    <option value="none">None</option>
                                    <option value="bestseller">Bestseller</option>
                                    <option value="new">New</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-text-secondary mb-2">Short Description *</label>
                            <textarea
                                required
                                rows={2}
                                value={formData.shortDescription}
                                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                className="w-full px-4 py-3 bg-[#111] border border-border-glass rounded-xl text-text-primary outline-none focus:border-accent-yellow transition-colors resize-none"
                                placeholder="Brief summary for product cards..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-text-secondary mb-2">Detailed Description *</label>
                            <textarea
                                required
                                rows={5}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 bg-[#111] border border-border-glass rounded-xl text-text-primary outline-none focus:border-accent-yellow transition-colors resize-none"
                                placeholder="Full description for the product page..."
                            />
                        </div>
                    </div>

                    <div className="bg-bg-card border border-border-glass rounded-[24px] p-6 space-y-5">
                        <h2 className="text-xl font-bold font-[Outfit] border-b border-border-glass pb-4 mb-4">Specifications & Highlights</h2>

                        {/* Highlights */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-semibold text-text-secondary">Key Highlights</label>
                                <button type="button" onClick={addHighlight} className="text-xs text-accent-yellow hover:underline">+ Add Highlight</button>
                            </div>
                            <div className="space-y-3">
                                {highlights.map((h, i) => (
                                    <div key={i} className="flex gap-3">
                                        <input
                                            type="text"
                                            value={h.icon}
                                            onChange={(e) => handleHighlightChange(i, 'icon', e.target.value)}
                                            className="w-16 text-center px-2 py-2 bg-[#111] border border-border-glass rounded-xl text-text-primary outline-none focus:border-accent-yellow"
                                            placeholder="Emoji"
                                        />
                                        <input
                                            type="text"
                                            value={h.text}
                                            onChange={(e) => handleHighlightChange(i, 'text', e.target.value)}
                                            className="flex-1 px-4 py-2 bg-[#111] border border-border-glass rounded-xl text-text-primary outline-none focus:border-accent-yellow"
                                            placeholder="e.g. Oil Resistant"
                                        />
                                        {highlights.length > 1 && (
                                            <button type="button" onClick={() => removeHighlight(i)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors">
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-border-glass my-6" />

                        {/* Specifications */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-semibold text-text-secondary">Technical Specs</label>
                                <button type="button" onClick={addSpec} className="text-xs text-accent-yellow hover:underline">+ Add Spec</button>
                            </div>
                            <div className="space-y-3">
                                {specs.map((s, i) => (
                                    <div key={i} className="flex gap-3">
                                        <input
                                            type="text"
                                            value={s.key}
                                            onChange={(e) => handleSpecChange(i, 'key', e.target.value)}
                                            className="w-1/3 px-4 py-2 bg-[#111] border border-border-glass rounded-xl text-text-primary outline-none focus:border-accent-yellow"
                                            placeholder="e.g. Material"
                                        />
                                        <input
                                            type="text"
                                            value={s.value}
                                            onChange={(e) => handleSpecChange(i, 'value', e.target.value)}
                                            className="flex-1 px-4 py-2 bg-[#111] border border-border-glass rounded-xl text-text-primary outline-none focus:border-accent-yellow"
                                            placeholder="e.g. Leather"
                                        />
                                        {specs.length > 1 && (
                                            <button type="button" onClick={() => removeSpec(i)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors">
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    <div className="bg-bg-card border border-border-glass rounded-[24px] p-6 sticky top-6">

                        {/* Image Upload Area */}
                        <div className="mb-8">
                            <h2 className="text-lg font-bold font-[Outfit] mb-4">Product Image *</h2>

                            <div
                                className={`relative w-full aspect-square rounded-[16px] overflow-hidden border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors
                  ${previewUrl ? 'border-accent-yellow' : 'border-border-glass hover:border-white/20 bg-[#111]'}`}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {previewUrl ? (
                                    <>
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-md p-2 text-center text-xs font-semibold">
                                            Click to change image
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-6">
                                        <div className="w-12 h-12 mx-auto rounded-full bg-white/[0.04] flex items-center justify-center text-text-muted mb-3">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                        </div>
                                        <span className="text-sm font-semibold text-text-secondary block">Upload Image</span>
                                        <span className="text-xs text-text-muted mt-1 block">JPG, PNG up to 5MB</span>
                                    </div>
                                )}
                                <input
                                    required
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    accept="image/jpeg, image/png, image/webp"
                                    className="hidden"
                                />
                            </div>
                        </div>

                        <div className="space-y-5 mb-8">
                            <div>
                                <label className="block text-sm font-semibold text-text-secondary mb-2">Available Sizes</label>
                                <input
                                    type="text"
                                    value={formData.sizes}
                                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#111] border border-border-glass rounded-xl text-text-primary outline-none focus:border-accent-yellow transition-colors"
                                    placeholder="e.g. S, M, L, XL"
                                />
                                <p className="text-xs text-text-muted mt-1">Comma separated</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-text-secondary mb-2">Applications</label>
                                <textarea
                                    rows={4}
                                    value={formData.applications}
                                    onChange={(e) => setFormData({ ...formData, applications: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#111] border border-border-glass rounded-xl text-text-primary outline-none focus:border-accent-yellow transition-colors resize-none mb-1"
                                    placeholder="e.g. Construction\nManufacturing\nOil & Gas"
                                />
                                <p className="text-xs text-text-muted">One item per line</p>
                            </div>
                        </div>

                        {/* Submit Action */}
                        <div className="pt-6 border-t border-border-glass">
                            <button
                                type="submit"
                                disabled={loading || uploadingImage || !selectedFile}
                                className="w-full py-4 rounded-xl font-bold bg-accent-yellow text-[#111] shadow-[0_4px_20px_rgba(245,197,24,0.3)] hover:bg-accent-yellow-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {loading || uploadingImage ? 'Saving Product...' : 'Publish Product'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
