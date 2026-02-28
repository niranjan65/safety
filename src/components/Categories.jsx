import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'

/* ─── Fallback data ─── */
const fallbackCategories = [
    { name: 'Safety Shoes', slug: 'safety-shoes', image: '/images/steel-toe-shoes.png', subtitle: 'Hillson · Agarson · Mallcom' },
    { name: 'Leather Gloves', slug: 'leather-gloves', image: '/images/leather-gloves.png' },
    { name: 'Electrical Gloves', slug: 'electrical-gloves', image: '/images/electrical-gloves.png' },
    { name: 'Heat Resistant Gloves', slug: 'heat-resistant-gloves', image: '/images/heat-resistant-gloves.png' },
    { name: 'Reflective Jackets', slug: 'reflective-jackets', image: '/images/reflective-jacket.png' },
    { name: 'Safety Helmets', slug: 'safety-helmets', image: '/images/safety-helmet.png' },
    { name: 'Safety Goggles', slug: 'safety-goggles', image: '/images/safety-goggles.png' },
]

export default function Categories() {
    const [categories, setCategories] = useState(fallbackCategories)

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => { if (Array.isArray(data) && data.length) setCategories(data) })
            .catch(() => {/* use fallback */ })
    }, [])

    return (
        <section className="py-24" id="categories">
            <div className="max-w-[1280px] mx-auto px-6">
                <ScrollReveal className="text-center mb-14">
                    <span className="inline-block text-xs font-bold tracking-[3px] uppercase text-accent-yellow mb-3">Browse by Category</span>
                    <h2 className="text-[clamp(2rem,4vw,3rem)] font-black mb-4">Safety Equipment for Every Role</h2>
                    <p className="text-text-secondary text-lg max-w-[600px] mx-auto">
                        Explore our comprehensive range of certified industrial safety gear designed for maximum protection and performance.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, i) => (
                        <ScrollReveal key={cat.slug || cat.name} delay={i * 80}>
                            <Link to={`/product/${cat.slug}`} className="group block bg-bg-card border border-border-glass rounded-[20px] overflow-hidden
                hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:border-accent-yellow/15 transition-all duration-400">
                                <div className="w-full h-56 overflow-hidden">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                                </div>
                                <div className="p-5 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold font-[Outfit]">{cat.name}</h3>
                                        {cat.subtitle && <p className="text-xs text-accent-yellow mt-0.5">{cat.subtitle}</p>}
                                    </div>
                                    <span className="w-8 h-8 rounded-full bg-accent-yellow/10 flex items-center justify-center text-accent-yellow group-hover:bg-accent-yellow group-hover:text-[#111] transition-all duration-300">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                                    </span>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
