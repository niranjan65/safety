import ScrollReveal from './ScrollReveal'

export default function Hero() {
    const smoothScroll = (e, href) => {
        e.preventDefault()
        const el = document.querySelector(href)
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 80
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img src="/images/hero-banner.png" alt="Industrial workers wearing Sarda Industries safety gear" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(17,17,19,0.95)] via-[rgba(17,17,19,0.7)] to-[rgba(17,17,19,0.3)]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-[120px]">
                <div className="max-w-[680px]">
                    <ScrollReveal>
                        <span className="inline-block text-xs font-bold tracking-[3px] uppercase text-accent-yellow mb-5">
                            🛡️ Where Safety Meets Strength — Since 1990
                        </span>
                    </ScrollReveal>

                    <ScrollReveal delay={100}>
                        <h1 className="text-[clamp(2.5rem,5.5vw,4.2rem)] font-black mb-5 bg-gradient-to-br from-text-primary from-60% to-accent-yellow bg-clip-text text-transparent leading-[1.1]">
                            Industrial Safety Equipment You Can Trust.
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <p className="text-lg text-text-secondary mb-9 max-w-[520px] leading-relaxed">
                            Leading manufacturer & supplier of PPE solutions — Hand protection, Safety helmets, Reflective jackets & more.
                            Serving Oil & Gas, EPC, Infrastructure & Government sectors across India.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={300}>
                        <div className="flex gap-4 flex-wrap mb-12">
                            <a href="#best-sellers" onClick={e => smoothScroll(e, '#best-sellers')}
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-br from-accent-yellow to-accent-orange text-[#111] font-semibold hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(245,197,24,0.35)] transition-all duration-300">
                                View Products
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                            </a>
                            <a href="#bulk-order" onClick={e => smoothScroll(e, '#bulk-order')}
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-white/25 text-text-primary font-semibold hover:border-accent-yellow hover:text-accent-yellow hover:-translate-y-0.5 transition-all duration-300">
                                Request Bulk Quote
                            </a>
                        </div>
                    </ScrollReveal>

                    {/* Trust Badges */}
                    <div className="flex gap-4 flex-wrap">
                        {[
                            { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v7c0 6 9 10 9 10s9-4 9-10V3" /><path d="M9 12l2 2 4-4" /></svg>, text: 'Since 1990' },
                            { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>, text: 'Quality Inspected' },
                            { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, text: 'Pan-India Supply' },
                            { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>, text: 'Export Capability' },
                        ].map((badge, i) => (
                            <ScrollReveal key={i} delay={400 + i * 100}>
                                <div className="flex items-center gap-2.5 bg-glass backdrop-blur-xl border border-border-glass rounded-[14px] px-5 py-3">
                                    <div className="w-9 h-9 rounded-full bg-accent-yellow/10 flex items-center justify-center text-accent-yellow">
                                        {badge.icon}
                                    </div>
                                    <span className="text-sm font-semibold">{badge.text}</span>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
