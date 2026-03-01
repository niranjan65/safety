"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import ScrollReveal from './ScrollReveal'

/* ─── Fallback Data ─── */
const fallbackProduct = {
    name: 'Chrome Leather Safety Gloves',
    slug: 'chrome-leather-gloves-12',
    category: 'leather-gloves',
    images: ['/images/leather-gloves.png'],
    shortDescription: 'Premium chrome/split leather industrial gloves — 12 inch length with Kevlar thread stitching. Designed for welding, fabrication, construction, and heavy engineering applications.',
    description: 'The Chrome Leather Safety Gloves (12") from Sarda Industries are engineered for maximum hand protection in demanding industrial environments. Crafted from premium chrome/split leather with a thickness of 1.1–1.3mm, these gloves deliver outstanding durability and abrasion resistance. Featuring Kevlar thread stitching for superior seam strength. Available with optional cotton fleece lining.',
    highlights: [{ icon: '🧤', text: 'Abrasion Resistant' }, { icon: '🔥', text: 'Heat Protection' }, { icon: '✊', text: 'High Grip Performance' }, { icon: '🧵', text: 'Kevlar Stitching' }],
    specs: [{ key: 'Material', value: 'Chrome / Split Leather' }, { key: 'Thickness', value: '1.1mm – 1.3mm' }, { key: 'Length', value: '12 inch' }, { key: 'Stitching', value: 'Kevlar Thread' }, { key: 'Cuff Type', value: 'Safety Cuff / Gauntlet' }, { key: 'Lining', value: 'Cotton Fleece (Optional)' }, { key: 'Color', value: 'Natural / Grey' }, { key: 'Abrasion', value: 'High Abrasion Resistance' }, { key: 'Heat Protection', value: 'Moderate Heat Protection' }, { key: 'Manufacturing', value: 'Industrial Grade — Batch Inspected' }],
    badge: 'bestseller', rating: 5, reviews: 312, sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    applications: ['Welding & metal fabrication', 'Construction & civil engineering', 'Heavy engineering & manufacturing', 'Oil & Gas operations', 'Infrastructure projects'],
}

const reviews = [
    { name: 'Vikram Singh', company: 'Tata Projects', rating: 5, comment: 'We\'ve been sourcing leather gloves from Sarda Industries for our welding division for 3 years. The Kevlar stitching holds up incredibly well and quality is consistent across every batch order.', verified: true },
    { name: 'Anita Desai', company: 'L&T Construction', rating: 5, comment: 'Ordered 2,000 pairs for our construction sites. Excellent grip performance and the split leather quality is much better than competing suppliers. Great bulk pricing too.', verified: true },
    { name: 'Mohammed Rafi', company: 'ONGC', rating: 4, comment: 'Good heat protection for moderate temperature work. The cotton fleece lining adds comfort for extended shifts. Only wish the gauntlet cuff option was slightly longer.', verified: true },
    { name: 'Pradeep Kumar', company: 'Reliance Industries', rating: 5, comment: 'After switching to Sarda Industries, hand injury reports at our fabrication unit dropped by 40%. The abrasion resistance is noticeably superior. Highly recommended for industrial use.', verified: true },
]

const ratingBreakdown = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 15 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
]

/* ─── Component ─── */
export default function ProductPage() {
    const { slug } = useParams()
    const [product, setProduct] = useState(fallbackProduct)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeImg, setActiveImg] = useState(0)
    const [selectedSize, setSelectedSize] = useState('')
    const [qty, setQty] = useState(1)
    const [activeTab, setActiveTab] = useState('description')
    const [zoomed, setZoomed] = useState(false)
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
    const [rfqSent, setRfqSent] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        setLoading(true)
        fetch(`/api/products/${slug}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.name) {
                    setProduct(data)
                    setSelectedSize(data.sizes?.[Math.floor((data.sizes?.length || 0) / 2)] || '')
                }
            })
            .catch(() => { /* use fallback */ })
            .finally(() => setLoading(false))

        // Fetch related products
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setRelatedProducts(data.filter(p => p.slug !== slug).slice(0, 4))
                }
            })
            .catch(() => { })
    }, [slug])

    const handleRFQ = async () => {
        setRfqSent(true)
        try {
            await fetch('/api/quotes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productName: product.name,
                    productSlug: product.slug,
                    customerName: 'Website Visitor',
                    email: 'inquiry@sardaindustries.com',
                    phone: 'N/A',
                    quantity: String(qty),
                    size: selectedSize,
                    message: `Quick RFQ from product page — ${product.name}, Size: ${selectedSize}, Qty: ${qty}`,
                }),
            })
        } catch (e) { /* silent fail */ }
        setTimeout(() => setRfqSent(false), 1800)
    }

    const handleZoomMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setZoomPos({ x, y })
    }

    return (
        <div className="pt-20">
            {/* ─── BREADCRUMB ─── */}
            <div className="max-w-[1280px] mx-auto px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Link href="/" className="hover:text-accent-yellow transition-colors">Home</Link>
                    <span>/</span>
                    <span className="hover:text-accent-yellow transition-colors cursor-pointer">Shop</span>
                    <span>/</span>
                    <span className="hover:text-accent-yellow transition-colors cursor-pointer">{product.category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    <span>/</span>
                    <span className="text-text-primary">{product.name}</span>
                </div>
            </div>

            {/* ═══════════════════════════════════════════
          SECTION 1 — PRODUCT MAIN (2-COL)
          ═══════════════════════════════════════════ */}
            <section className="max-w-[1280px] mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* ── LEFT: Image Gallery ── */}
                    <ScrollReveal>
                        <div>
                            {/* Main Image */}
                            <div
                                className="relative w-full aspect-square bg-bg-card rounded-[20px] overflow-hidden border border-border-glass cursor-crosshair mb-4"
                                onMouseEnter={() => setZoomed(true)}
                                onMouseLeave={() => setZoomed(false)}
                                onMouseMove={handleZoomMove}
                            >
                                <img
                                    src={product.images?.[activeImg] || product.images?.[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-300"
                                    style={zoomed ? { transform: 'scale(2)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
                                />

                                {/* Zoom hint */}
                                {!zoomed && (
                                    <div className="absolute bottom-4 right-4 bg-glass backdrop-blur-xl border border-border-glass rounded-full px-3 py-1.5 text-xs text-text-secondary flex items-center gap-1.5">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                                        Hover to zoom
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-3">
                                {(product.images || []).map((t, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImg(i)}
                                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer
                      ${activeImg === i ? 'border-accent-yellow shadow-[0_0_12px_rgba(245,197,24,0.3)]' : 'border-border-glass hover:border-white/20'}`}
                                    >
                                        <img src={t} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                                {/* 360 view button */}
                                <button className="w-20 h-20 rounded-xl border-2 border-border-glass hover:border-accent-yellow/50 flex flex-col items-center justify-center gap-1 text-text-muted hover:text-accent-yellow transition-all duration-300 bg-bg-card cursor-pointer">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" /></svg>
                                    <span className="text-[0.6rem] font-semibold">360°</span>
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* ── RIGHT: Product Info ── */}
                    <ScrollReveal delay={150}>
                        <div>
                            {/* Badge */}
                            <span className="inline-block px-3 py-1 rounded-full bg-accent-yellow/10 text-accent-yellow text-xs font-bold uppercase tracking-wider mb-4">
                                {product.badge || 'Product'}
                            </span>

                            {/* Title */}
                            <h1 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-black font-[Outfit] leading-[1.15] mb-3">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="flex gap-0.5 text-star text-sm">{'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}</div>
                                <span className="text-text-primary font-semibold text-sm">{(product.rating || 4.8).toFixed(1)}</span>
                                <span className="text-text-muted text-sm">({product.reviews} reviews)</span>
                                <span className="text-text-muted text-sm">|</span>
                                <span className="text-success text-sm font-medium">✓ In Stock</span>
                            </div>



                            {/* Short desc */}
                            <p className="text-text-secondary leading-relaxed mb-6">
                                {product.shortDescription}
                            </p>

                            {/* Bullet highlights */}
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {(product.highlights || []).map((h, i) => (
                                    <div key={i} className="flex items-center gap-2.5 bg-bg-card border border-border-glass rounded-xl px-4 py-3">
                                        <span className="text-lg">{h.icon}</span>
                                        <span className="text-sm font-medium">{h.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-border-glass mb-6" />

                            {/* Size selector */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-semibold">Size</span>
                                    <button className="text-xs text-accent-yellow hover:underline cursor-pointer">Size Guide</button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {(product.sizes || []).map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setSelectedSize(s)}
                                            className={`w-12 h-12 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200
                        ${selectedSize === s
                                                    ? 'bg-accent-yellow text-[#111] shadow-[0_0_16px_rgba(245,197,24,0.3)]'
                                                    : 'bg-bg-card border border-border-glass text-text-primary hover:border-accent-yellow/40'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="mb-8">
                                <span className="text-sm font-semibold mb-3 block">Quantity</span>
                                <div className="inline-flex items-center bg-bg-card border border-border-glass rounded-xl overflow-hidden">
                                    <button onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="w-12 h-12 flex items-center justify-center text-lg font-bold text-text-secondary hover:text-accent-yellow hover:bg-white/[0.04] transition-colors cursor-pointer">−</button>
                                    <span className="w-14 text-center font-semibold text-lg">{qty}</span>
                                    <button onClick={() => setQty(qty + 1)}
                                        className="w-12 h-12 flex items-center justify-center text-lg font-bold text-text-secondary hover:text-accent-yellow hover:bg-white/[0.04] transition-colors cursor-pointer">+</button>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col gap-3 mb-6">
                                <button onClick={handleRFQ}
                                    className={`w-full py-4 rounded-full font-bold text-base cursor-pointer transition-all duration-300
                      ${rfqSent
                                            ? 'bg-success text-white'
                                            : 'bg-gradient-to-br from-accent-yellow to-accent-orange text-[#111] hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(245,197,24,0.35)]'}`}>
                                    {rfqSent ? '✓ Quotation Request Sent!' : '📋 Request for Quotation'}
                                </button>
                                <button className="w-full py-3.5 rounded-full font-semibold text-sm border-2 border-white/20 text-text-primary hover:border-accent-yellow hover:text-accent-yellow transition-all duration-300 cursor-pointer">
                                    📦 Request Bulk Quote
                                </button>
                            </div>

                            {/* Stock & delivery */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="w-2.5 h-2.5 rounded-full bg-success" />
                                    <span className="text-success font-medium">In Stock</span>
                                    <span className="text-text-muted">— Ready to ship</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-secondary">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                                    <span>Estimated delivery: <strong className="text-text-primary">3–5 business days</strong></span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-secondary">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" /></svg>
                                    <span>Free returns within <strong className="text-text-primary">30 days</strong></span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
          SECTION 2 — TABBED SPECS
          ═══════════════════════════════════════════ */}
            <section className="border-t border-border-glass">
                <div className="max-w-[1280px] mx-auto px-6 py-20">
                    <ScrollReveal>
                        {/* Tabs */}
                        <div className="flex gap-1 border-b border-border-glass mb-10 overflow-x-auto">
                            {['description', 'specifications', 'certifications', 'reviews'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3.5 text-sm font-semibold capitalize whitespace-nowrap transition-all duration-300 cursor-pointer border-b-2 -mb-px
                    ${activeTab === tab
                                            ? 'border-accent-yellow text-accent-yellow'
                                            : 'border-transparent text-text-muted hover:text-text-primary'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[300px]">
                            {activeTab === 'description' && (
                                <div className="max-w-3xl space-y-5 text-text-secondary leading-[1.85]">
                                    <p>{product.description}</p>
                                    {product.applications?.length > 0 && (
                                        <>
                                            <h3 className="text-text-primary font-[Outfit] font-bold text-lg pt-2">Industrial Applications</h3>
                                            <ul className="list-disc list-inside space-y-1.5">
                                                {product.applications.map((a, i) => <li key={i}>{a}</li>)}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            )}

                            {activeTab === 'specifications' && (
                                <div className="max-w-2xl">
                                    <div className="rounded-[16px] overflow-hidden border border-border-glass">
                                        {(product.specs || []).map((spec, i) => (
                                            <div key={spec.key} className={`flex ${i % 2 === 0 ? 'bg-bg-card' : 'bg-transparent'}`}>
                                                <div className="w-[200px] shrink-0 px-5 py-4 text-sm font-semibold text-text-primary border-r border-border-glass">{spec.key}</div>
                                                <div className="flex-1 px-5 py-4 text-sm text-text-secondary">{spec.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'certifications' && (
                                <div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                                        {[
                                            { label: 'ISO Certified', sub: 'ISO 20345:2011', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> },
                                            { label: 'BIS Approved', sub: 'IS 15298 Part 2', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
                                            { label: 'CE Certified', sub: 'EN ISO 20345', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg> },
                                        ].map(c => (
                                            <div key={c.label} className="text-center p-8 bg-bg-card border border-border-glass rounded-[20px] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:border-accent-yellow/20 transition-all duration-400">
                                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-yellow/10 flex items-center justify-center text-accent-yellow">
                                                    {c.icon}
                                                </div>
                                                <h4 className="font-[Outfit] font-bold text-lg mb-1">{c.label}</h4>
                                                <p className="text-text-muted text-sm">{c.sub}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-text-secondary leading-[1.8] max-w-2xl">
                                        Every batch of gloves from Sarda Industries undergoes rigorous quality inspection before dispatch.
                                        Our in-house manufacturing facility follows industrial-grade standards, ensuring consistent quality.
                                        Certificates of conformity are available upon request for all bulk orders.
                                    </p>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <ReviewsTab />
                            )}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
          SECTION 3 — RELATED PRODUCTS
          ═══════════════════════════════════════════ */}
            <section className="border-t border-border-glass">
                <div className="max-w-[1280px] mx-auto px-6 py-20">
                    <ScrollReveal className="text-center mb-14">
                        <span className="inline-block text-xs font-bold tracking-[3px] uppercase text-accent-yellow mb-3">You May Also Like</span>
                        <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-black font-[Outfit]">Related Products</h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((p, i) => (
                            <ScrollReveal key={p.name} delay={i * 80}>
                                <div className="group bg-bg-card border border-border-glass rounded-[20px] overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:border-accent-yellow/15 transition-all duration-400">
                                    <div className="w-full h-56 overflow-hidden bg-[#16161a]">
                                        <img src={p.images?.[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                                    </div>
                                    <div className="p-5">
                                        <h4 className="font-semibold mb-3">{p.name}</h4>
                                        <button className="w-full py-2 rounded-full text-xs font-semibold bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/30 hover:bg-accent-yellow hover:text-[#111] transition-all duration-300 cursor-pointer">
                                            📋 Request Quotation
                                        </button>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
          SECTION 4 — BULK ORDER CTA
          ═══════════════════════════════════════════ */}
            <section className="py-16">
                <div className="max-w-[1280px] mx-auto px-6">
                    <ScrollReveal>
                        <div className="relative rounded-[28px] overflow-hidden min-h-[340px] flex items-center">
                            <div className="absolute inset-0">
                                <img src="/images/bulk-order-banner.png" alt="Bulk warehouse" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(17,17,19,0.95)] via-[rgba(17,17,19,0.65)] to-[rgba(17,17,19,0.3)]" />
                            </div>
                            <div className="relative z-10 p-10 md:p-[60px] max-w-[520px]">
                                <span className="inline-block text-xs font-bold tracking-[3px] uppercase text-accent-yellow mb-4">B2B Solutions</span>
                                <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-black font-[Outfit] mb-4 leading-[1.15]">
                                    Outfitting Your Entire Workforce?
                                </h2>
                                <p className="text-text-secondary leading-[1.8] mb-8">
                                    Get special corporate pricing on bulk purchases. Volume discounts up to 40% off with dedicated account management.
                                </p>
                                <a href="#" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-br from-accent-yellow to-accent-orange text-[#111] font-semibold hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(245,197,24,0.35)] transition-all duration-300">
                                    Request Custom Quote
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    )
}

/* ─── Reviews Sub-Component ─── */
function ReviewsTab() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">
            {/* Left: Summary */}
            <div className="bg-bg-card border border-border-glass rounded-[20px] p-8">
                <div className="text-center mb-6">
                    <div className="text-5xl font-[Outfit] font-black text-accent-yellow mb-1">4.8</div>
                    <div className="flex justify-center gap-0.5 text-star text-lg mb-2">★★★★★</div>
                    <p className="text-text-muted text-sm">Based on 312 reviews</p>
                </div>
                <div className="space-y-2.5">
                    {ratingBreakdown.map(r => (
                        <div key={r.stars} className="flex items-center gap-3">
                            <span className="text-sm text-text-muted w-3">{r.stars}</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-star shrink-0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                            <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                                <div className="h-full bg-accent-yellow rounded-full transition-all duration-700" style={{ width: `${r.pct}%` }} />
                            </div>
                            <span className="text-xs text-text-muted w-8 text-right">{r.pct}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Review Cards */}
            <div className="space-y-5">
                {reviews.map((r, i) => (
                    <div key={i} className="bg-bg-card border border-border-glass rounded-[16px] p-6 hover:border-border-glass/50 transition-all duration-300">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-yellow to-accent-orange flex items-center justify-center font-[Outfit] font-bold text-[#111] text-sm">
                                    {r.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold text-sm">{r.name}</h4>
                                        {r.verified && (
                                            <span className="px-2 py-0.5 rounded-full bg-success/15 text-success text-[0.65rem] font-bold">✓ Verified</span>
                                        )}
                                    </div>
                                    <span className="text-text-muted text-xs">{r.company}</span>
                                </div>
                            </div>
                            <div className="flex gap-0.5 text-star text-xs">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                        </div>
                        <p className="text-text-secondary text-sm leading-[1.8]">{r.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
