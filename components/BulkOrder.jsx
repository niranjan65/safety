import ScrollReveal from './ScrollReveal'

export default function BulkOrder() {
    return (
        <section className="py-24" id="bulk-order">
            <div className="max-w-[1280px] mx-auto px-6">
                <ScrollReveal>
                    <div className="relative rounded-[28px] overflow-hidden min-h-[400px] flex items-center">
                        {/* Background */}
                        <div className="absolute inset-0">
                            <img src="/images/bulk-order-banner.png" alt="Warehouse with safety equipment" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(17,17,19,0.95)] via-[rgba(17,17,19,0.65)] to-[rgba(17,17,19,0.3)]" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-10 md:p-[60px] max-w-[560px]">
                            <span className="inline-block text-xs font-bold tracking-[3px] uppercase text-accent-yellow mb-4">B2B Solutions</span>
                            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black mb-4 leading-[1.15]">
                                Outfitting an Entire Workforce?
                            </h2>
                            <p className="text-text-secondary text-base leading-[1.8] mb-8">
                                Whether you need 50 helmets or 5,000 pairs of gloves, we offer competitive bulk pricing, dedicated account managers, and custom branding options to meet your enterprise needs. Get volume discounts up to 40% off retail pricing.
                            </p>
                            <a href="#" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-br from-accent-yellow to-accent-orange text-[#111] font-semibold hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(245,197,24,0.35)] transition-all duration-300">
                                Request a Custom Quote
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                            </a>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
