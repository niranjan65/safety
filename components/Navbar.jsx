"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const links = [
        { label: 'Home', href: '#hero' },
        { label: 'Shop', href: '#categories' },
        { label: 'Categories', href: '#categories' },
        { label: 'Bulk Orders', href: '#bulk-order' },
        { label: 'About', to: '/about' },
        { label: 'Contact', href: '#footer' },
    ]

    const pathname = usePathname()
    const router = useRouter()

    const smoothScroll = (e, href) => {
        e.preventDefault()
        setMenuOpen(false)
        if (pathname !== '/') {
            router.push('/')
            setTimeout(() => {
                const el = document.querySelector(href)
                if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 80
                    window.scrollTo({ top, behavior: 'smooth' })
                }
            }, 100)
        } else {
            const el = document.querySelector(href)
            if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 80
                window.scrollTo({ top, behavior: 'smooth' })
            }
        }
    }

    return (
        <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-[350ms] ease-out
      ${scrolled
                ? 'bg-[rgba(17,17,19,0.92)] backdrop-blur-2xl py-2.5 shadow-[0_2px_20px_rgba(0,0,0,0.5)]'
                : 'bg-transparent py-4'}`}>
            <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between gap-5">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 font-[Outfit] font-black text-2xl text-text-primary shrink-0">
                    <div className="w-[38px] h-[38px] bg-gradient-to-br from-accent-yellow to-accent-orange rounded-[10px] flex items-center justify-center text-[#111]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </div>
                    SARDA <span className="text-accent-yellow">INDUSTRIES</span>
                </Link>

                <ul className="hidden lg:flex items-center gap-7">
                    {links.map(l => (
                        <li key={l.label}>
                            {l.to ? (
                                <Link href={l.to}
                                    className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors relative
                  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5
                  after:bg-accent-yellow after:transition-all after:duration-300 hover:after:w-full">
                                    {l.label}
                                </Link>
                            ) : (
                                <a href={l.href} onClick={e => smoothScroll(e, l.href)}
                                    className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors relative
                  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5
                  after:bg-accent-yellow after:transition-all after:duration-300 hover:after:w-full">
                                    {l.label}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="flex items-center gap-4 shrink-0">
                    {/* Search */}
                    <div className="hidden lg:flex items-center gap-2 bg-white/[0.06] border border-border-glass rounded-full px-4 py-2 w-[200px] focus-within:border-accent-yellow focus-within:w-[240px] transition-all duration-300">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted shrink-0"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        <input type="text" placeholder="Search products…" className="bg-transparent text-text-primary text-sm w-full outline-none placeholder:text-text-muted" />
                    </div>

                    {/* Inquiry */}
                    <a href="tel:+919331000388" className="relative w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center cursor-pointer hover:bg-white/[0.12] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    </a>

                    {/* CTA */}
                    <a href="#bulk-order" onClick={e => smoothScroll(e, '#bulk-order')}
                        className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-br from-accent-yellow to-accent-orange text-[#111] text-sm font-semibold hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(245,197,24,0.35)] transition-all duration-300">
                        Request Bulk Quote
                    </a>

                    {/* Mobile toggle */}
                    <button className="flex lg:hidden flex-col gap-[5px] cursor-pointer z-[1100]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        <span className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="fixed inset-0 bg-[rgba(17,17,19,0.97)] backdrop-blur-2xl z-[1050] flex flex-col items-center justify-center gap-8 lg:hidden">
                    {links.map(l => (
                        l.to ? (
                            <Link key={l.label} href={l.to} onClick={() => setMenuOpen(false)}
                                className="text-xl font-semibold text-text-primary hover:text-accent-yellow transition-colors">
                                {l.label}
                            </Link>
                        ) : (
                            <a key={l.label} href={l.href} onClick={e => smoothScroll(e, l.href)}
                                className="text-xl font-semibold text-text-primary hover:text-accent-yellow transition-colors">
                                {l.label}
                            </a>
                        )
                    ))}
                    <a href="#bulk-order" onClick={e => smoothScroll(e, '#bulk-order')}
                        className="mt-4 px-8 py-3 rounded-full bg-gradient-to-br from-accent-yellow to-accent-orange text-[#111] font-bold">
                        Request Bulk Quote
                    </a>
                </div>
            )}
        </nav>
    )
}
