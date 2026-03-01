"use client"
import { useState } from 'react'

export default function Footer() {
    const [subEmail, setSubEmail] = useState('')
    const [subbed, setSubbed] = useState(false)

    const handleSub = (e) => {
        e.preventDefault()
        setSubbed(true)
        setSubEmail('')
        setTimeout(() => setSubbed(false), 2500)
    }

    return (
        <footer className="pt-20 border-t border-border-glass" id="footer">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] gap-12 mb-16">

                    {/* Brand */}
                    <div>
                        <a href="#" className="flex items-center gap-2.5 font-[Outfit] font-black text-2xl text-text-primary mb-4">
                            <div className="w-[38px] h-[38px] bg-gradient-to-br from-accent-yellow to-accent-orange rounded-[10px] flex items-center justify-center text-[#111]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            </div>
                            SARDA <span className="text-accent-yellow">INDUSTRIES</span>
                        </a>
                        <p className="text-text-secondary text-sm leading-[1.8] mb-6">
                            Leading manufacturer & supplier of industrial safety equipment and PPE solutions. Established in 1990.
                        </p>
                        <div className="flex gap-3">
                            {[
                                <svg key="fb" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
                                <svg key="li" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
                                <svg key="tw" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
                                <svg key="ig" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
                            ].map((icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-text-secondary hover:bg-accent-yellow hover:text-[#111] transition-all duration-300">
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-[Outfit] font-bold mb-5">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'Shop All', 'Bulk Orders', 'About Us', 'Reviews', 'Contact'].map(l => (
                                <li key={l}><a href="#" className="text-sm text-text-secondary hover:text-accent-yellow transition-colors">{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-[Outfit] font-bold mb-5">Categories</h4>
                        <ul className="space-y-3">
                            {['Safety Shoes', 'Leather Gloves', 'Electrical Gloves', 'Heat Resistant Gloves', 'Reflective Jackets', 'Safety Helmets'].map(l => (
                                <li key={l}><a href="#" className="text-sm text-text-secondary hover:text-accent-yellow transition-colors">{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter + Contact */}
                    <div>
                        <h4 className="font-[Outfit] font-bold mb-3">Stay Updated</h4>
                        <p className="text-text-secondary text-sm leading-[1.7] mb-4">Subscribe for the latest product launches, safety tips, and exclusive B2B offers.</p>
                        <form onSubmit={handleSub} className="flex gap-2 mb-6">
                            <input type="email" placeholder="Enter your email" required value={subEmail} onChange={e => setSubEmail(e.target.value)}
                                className="flex-1 px-4 py-2.5 rounded-full bg-white/[0.06] border border-border-glass text-text-primary text-sm placeholder:text-text-muted focus:border-accent-yellow outline-none transition-colors" />
                            <button type="submit"
                                className={`px-6 py-2.5 rounded-full text-sm font-bold cursor-pointer whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5
                  ${subbed ? 'bg-success text-white' : 'bg-gradient-to-br from-accent-yellow to-accent-orange text-[#111] hover:shadow-[0_4px_20px_rgba(245,197,24,0.3)]'}`}>
                                {subbed ? '✓ Subscribed!' : 'Subscribe'}
                            </button>
                        </form>

                        <h4 className="font-[Outfit] font-bold mb-3">Contact Us</h4>
                        <ul className="space-y-2">
                            <li className="text-sm text-text-secondary">📧 guddusarda73@gmail.com</li>
                            <li className="text-sm text-text-secondary">📞 +91 9331000388</li>
                            <li className="text-sm text-text-secondary">📍 India</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-border-glass py-6 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-text-muted">© 2026 Sarda Industries. All rights reserved.</p>
                    <div className="flex gap-6">
                        {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(l => (
                            <a key={l} href="#" className="text-xs text-text-muted hover:text-accent-yellow transition-colors">{l}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
