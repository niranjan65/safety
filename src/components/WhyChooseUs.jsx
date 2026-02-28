import ScrollReveal from './ScrollReveal'

const features = [
    {
        icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v7c0 6 9 10 9 10s9-4 9-10V3" /><path d="M9 12l2 2 4-4" /></svg>,
        title: 'In-House Manufacturing',
        desc: 'Our own manufacturing facility ensures strict quality control and consistency across every batch of products we deliver.',
    },
    {
        icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a4 4 0 0 0-8 0v2" /><circle cx="12" cy="14" r="2" /></svg>,
        title: 'Bulk Production Capacity',
        desc: 'Equipped for large-scale orders — from 50 units to 50,000+. Serving Oil & Gas, EPC contractors, and government organizations.',
    },
    {
        icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
        title: 'Pan-India Logistics',
        desc: 'Nationwide delivery network ensuring your safety gear reaches anywhere in India — and international export capability.',
    },
    {
        icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
        title: 'Strict Quality Inspection',
        desc: 'Every product is batch inspected before dispatch. Industrial-grade manufacturing standards with long-term supply reliability.',
    },
]

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-gradient-to-b from-transparent via-accent-yellow/[0.02] to-transparent" id="why-us">
            <div className="max-w-[1280px] mx-auto px-6">
                <ScrollReveal className="text-center mb-14">
                    <span className="inline-block text-xs font-bold tracking-[3px] uppercase text-accent-yellow mb-3">Our Advantage</span>
                    <h2 className="text-[clamp(2rem,4vw,3rem)] font-black mb-4">Why Choose Sarda Industries</h2>
                    <p className="text-text-secondary text-lg max-w-[600px] mx-auto">
                        Established in 1990 — we provide more than products, we deliver peace of mind with every order.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <ScrollReveal key={f.title} delay={i * 100}>
                            <div className="text-center p-9 bg-bg-card border border-border-glass rounded-[20px] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:border-accent-yellow/20 transition-all duration-400">
                                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent-yellow/10 flex items-center justify-center text-accent-yellow">
                                    {f.icon}
                                </div>
                                <h3 className="font-[Outfit] font-bold text-lg mb-3">{f.title}</h3>
                                <p className="text-text-secondary text-sm leading-[1.7]">{f.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
