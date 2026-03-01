import ScrollReveal from './ScrollReveal'

export default function CTASection() {
    return (
        <section className="py-24">
            <div className="max-w-[1280px] mx-auto px-6">
                <ScrollReveal>
                    <div className="relative bg-gradient-to-br from-accent-yellow to-accent-orange rounded-[28px] py-20 px-10 md:px-[60px] text-center overflow-hidden">
                        {/* Decorative shapes */}
                        <div className="absolute -top-1/2 -left-[10%] w-1/2 h-[200%] bg-white/[0.06] rotate-[15deg] pointer-events-none" />
                        <div className="absolute -bottom-[40%] -right-[5%] w-[40%] h-[180%] bg-black/[0.06] -rotate-[10deg] pointer-events-none" />

                        <h2 className="relative z-10 text-[clamp(1.8rem,3.5vw,3rem)] text-[#111] font-black mb-4 leading-[1.15]">
                            Safety Is Not an Option. It's a Standard.
                        </h2>
                        <p className="relative z-10 text-black/65 text-lg max-w-[520px] mx-auto mb-9">
                            Join 10,000+ companies that trust Sarda Industries to keep their workforce protected every single day.
                        </p>
                        <a href="#best-sellers"
                            className="relative z-10 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#111] text-accent-yellow font-bold hover:bg-[#222] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
                            Equip Your Team Today
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
