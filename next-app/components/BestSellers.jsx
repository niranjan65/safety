"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'

function ProductCard({ product, delay }) {
    const [requested, setRequested] = useState(false)

    const handleRFQ = () => {
        setRequested(true)
        setTimeout(() => setRequested(false), 1800)
    }

    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating)
    const img = product.images?.[0] || product.img

    return (
        <ScrollReveal delay={delay}>
            <div className="group bg-bg-card border border-border-glass rounded-[20px] overflow-hidden transition-all duration-400
        hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:border-accent-yellow/15">
                {/* Image */}
                <Link href={`/product/${product.slug}`} className="block relative w-full h-60 overflow-hidden bg-[#16161a]">
                    <img src={img} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />

                    {product.badge && (
                        <span className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider
              ${product.badge === 'bestseller' ? 'bg-accent-yellow text-[#111]' : 'bg-accent-orange text-white'}`}>
                            {product.badge === 'bestseller' ? 'Bestseller' : 'New'}
                        </span>
                    )}

                    <span className="absolute bottom-3.5 left-1/2 -translate-x-1/2 translate-y-5 opacity-0 group-hover:opacity-100 group-hover:translate-y-0
            px-5 py-2.5 bg-glass backdrop-blur-xl border border-border-glass rounded-full text-text-primary text-xs font-semibold
            hover:bg-accent-yellow hover:text-[#111] hover:border-accent-yellow transition-all duration-350 whitespace-nowrap cursor-pointer">
                        ⚡ Quick View
                    </span>
                </Link>

                {/* Body */}
                <div className="p-5">
                    <Link href={`/product/${product.slug}`}><h4 className="text-base font-semibold mb-2 hover:text-accent-yellow transition-colors">{product.name}</h4></Link>
                    <div className="flex items-center gap-1.5 mb-3">
                        <span className="text-star text-sm tracking-tight">{stars}</span>
                        <span className="text-text-muted text-xs">({product.reviews})</span>
                    </div>
                    <button onClick={handleRFQ}
                        className={`w-full py-2.5 rounded-full text-sm font-semibold cursor-pointer transition-all duration-300
              ${requested
                                ? 'bg-success text-white'
                                : 'bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/30 hover:bg-accent-yellow hover:text-[#111]'}`}>
                        {requested ? '✓ Request Sent!' : '📋 Request Quotation'}
                    </button>
                </div>
            </div>
        </ScrollReveal>
    )
}

/* ─── Fallback data (used while API is loading or unavailable) ─── */
const fallbackProducts = [
    { name: 'Hillson Steel Toe Safety Shoes', slug: 'hillson-steel-toe-safety-shoes', images: ['/images/steel-toe-shoes.png'], rating: 5, reviews: 412, badge: 'bestseller' },
    { name: 'Agarson Oil Resistant Shoes', slug: 'agarson-oil-resistant-shoes', images: ['/images/steel-toe-shoes.png'], rating: 5, reviews: 287, badge: 'bestseller' },
    { name: 'Mallcom Anti-Skid Safety Shoes', slug: 'mallcom-anti-skid-safety-shoes', images: ['/images/steel-toe-shoes.png'], rating: 4, reviews: 198, badge: 'new' },
    { name: 'Chrome Leather Gloves 12"', slug: 'chrome-leather-gloves-12', images: ['/images/leather-gloves.png'], rating: 5, reviews: 312, badge: 'bestseller' },
    { name: 'Electrical Gloves 33KV', slug: 'electrical-gloves-33kv', images: ['/images/electrical-gloves.png'], rating: 5, reviews: 187, badge: null },
    { name: 'Heat Resistant Furnace Gloves', slug: 'heat-resistant-furnace-gloves', images: ['/images/heat-resistant-gloves.png'], rating: 4, reviews: 145, badge: 'new' },
    { name: 'HiViz Reflective Safety Jacket', slug: 'hiviz-reflective-safety-jacket', images: ['/images/reflective-jacket.png'], rating: 5, reviews: 276, badge: 'bestseller' },
    { name: 'HDPE Industrial Safety Helmet', slug: 'hdpe-industrial-safety-helmet', images: ['/images/safety-helmet.png'], rating: 4, reviews: 245, badge: null },
]

export default function BestSellers() {
    const [products, setProducts] = useState(fallbackProducts)

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => { if (Array.isArray(data) && data.length) setProducts(data) })
            .catch(() => {/* use fallback */ })
    }, [])

    return (
        <section className="py-24 bg-gradient-to-b from-transparent via-accent-yellow/[0.02] to-transparent" id="best-sellers">
            <div className="max-w-[1280px] mx-auto px-6">
                <ScrollReveal className="text-center mb-14">
                    <span className="inline-block text-xs font-bold tracking-[3px] uppercase text-accent-yellow mb-3">Top Picks</span>
                    <h2 className="text-[clamp(2rem,4vw,3rem)] font-black mb-4">Best Selling Products</h2>
                    <p className="text-text-secondary text-lg max-w-[600px] mx-auto">
                        Industry-favorite gear trusted by thousands of professionals across Oil & Gas, EPC, and infrastructure sectors.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((p, i) => (
                        <ProductCard key={p.slug || p.name} product={p} delay={i * 70} />
                    ))}
                </div>
            </div>
        </section>
    )
}
