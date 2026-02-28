import { useEffect } from 'react'
import ScrollReveal from './ScrollReveal'

const certifications = [
    { label: 'ISO Certified', sub: 'Quality Management', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> },
    { label: 'MSME Registered', sub: 'WB-10-0018', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
    { label: 'IEC Holder', sub: 'Code: 02080', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg> },
    { label: 'GST Compliant', sub: 'Registered Enterprise', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg> },
]

const strengths = [
    { icon: '🏭', title: 'In-House Manufacturing', desc: 'Our own manufacturing facility ensures strict quality control and consistent product standards across every order.' },
    { icon: '📦', title: 'Bulk Production Capacity', desc: 'Equipped to handle large-scale orders — from 50 units to 50,000+. Project supplies and long-term rate contracts.' },
    { icon: '🚚', title: 'Pan-India Logistics', desc: 'Nationwide delivery network ensuring your safety gear reaches anywhere in India with timely dispatch.' },
    { icon: '🌍', title: 'Export Capability', desc: 'IEC Code: 02080 — serving international markets with compliant, export-quality industrial safety products.' },
    { icon: '🔍', title: 'Strict Quality Inspection', desc: 'Structured inspection processes with batch-level testing before dispatch. Every product meets industrial requirements.' },
    { icon: '🤝', title: 'Strategic Brand Partnerships', desc: 'Authorized dealer for Hillson, Agarson, Mallcom, and other leading safety brands — complete PPE solutions under one roof.' },
]

const industries = [
    { icon: '🛢️', name: 'Oil & Gas' },
    { icon: '🏗️', name: 'Construction & Engineering' },
    { icon: '⚙️', name: 'Manufacturing' },
    { icon: '⛏️', name: 'Mining & Metals' },
    { icon: '💊', name: 'Pharmaceutical' },
    { icon: '⚡', name: 'Energy & Utilities' },
]

export default function AboutPage() {
    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <div className="pt-20">
            {/* ─── HERO BANNER ─── */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/images/hero-banner.png" alt="Sarda Industries facility" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(17,17,19,0.97)] via-[rgba(17,17,19,0.85)] to-[rgba(17,17,19,0.6)]" />
                </div>
                <div className="relative z-10 max-w-[1280px] mx-auto px-6">
                    <ScrollReveal>
                        <span className="inline-block text-xs font-bold tracking-[3px] uppercase text-accent-yellow mb-4">About Us</span>
                        <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-black font-[Outfit] leading-[1.1] mb-5 max-w-[700px]">
                            Where Safety Meets <span className="bg-gradient-to-br from-accent-yellow to-accent-orange bg-clip-text text-transparent">Strength</span>
                        </h1>
                        <p className="text-text-secondary text-lg leading-relaxed max-w-[600px]">
                            Since 1990 — Over three decades of manufacturing excellence in industrial safety equipment.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ─── COMPANY OVERVIEW ─── */}
            <section className="py-20">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <ScrollReveal>
                            <div>
                                <span className="inline-block text-xs font-bold tracking-[3px] uppercase text-accent-yellow mb-4">Our Story</span>
                                <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-black font-[Outfit] leading-[1.15] mb-6">
                                    Trusted by Industries Across India & Beyond
                                </h2>
                                <div className="space-y-4 text-text-secondary leading-[1.85]">
                                    <p>
                                        Established in <strong className="text-text-primary">1990</strong>, Sarda Industries is a leading manufacturer and supplier of industrial safety equipment, delivering reliable and high-performance Personal Protective Equipment (PPE) solutions across India and international markets.
                                    </p>
                                    <p>
                                        With over three decades of industry experience, we have built a strong reputation for quality, consistency, and timely supply. Our <strong className="text-text-primary">in-house manufacturing capability</strong> combined with strategic partnerships with leading safety brands enables us to provide complete industrial safety solutions under one roof.
                                    </p>
                                    <p>
                                        We cater to critical industries including Oil & Gas, Construction & Engineering, Manufacturing, Mining & Metals, Pharmaceutical, and Energy & Utilities sectors where safety standards and product reliability are non-negotiable.
                                    </p>
                                    <p>
                                        From bulk project supplies to long-term rate contracts, Sarda Industries ensures <strong className="text-text-primary">dependable service, technical compliance, and durable protection solutions</strong>.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={150}>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { val: '1990', label: 'Year Established' },
                                    { val: '30+', label: 'Years Experience' },
                                    { val: '5000+', label: 'Clients Served' },
                                    { val: '50K+', label: 'Monthly Capacity' },
                                ].map((s, i) => (
                                    <div key={i} className="bg-bg-card border border-border-glass rounded-[20px] p-7 text-center hover:-translate-y-1 hover:border-accent-yellow/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-400">
                                        <div className="text-3xl font-[Outfit] font-black text-accent-yellow mb-1">{s.val}</div>
                                        <p className="text-text-muted text-sm">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ─── CERTIFICATIONS ─── */}
            <section className="py-20 border-t border-border-glass">
                <div className="max-w-[1280px] mx-auto px-6">
                    <ScrollReveal className="text-center mb-14">
                        <span className="inline-block text-xs font-bold tracking-[3px] uppercase text-accent-yellow mb-3">Compliance & Certifications</span>
                        <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-black font-[Outfit] mb-4">Quality You Can Verify</h2>
                        <p className="text-text-secondary text-lg max-w-[550px] mx-auto">
                            Our operations are certified and compliant with industrial standards.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {certifications.map((c, i) => (
                            <ScrollReveal key={c.label} delay={i * 100}>
                                <div className="text-center p-8 bg-bg-card border border-border-glass rounded-[20px] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:border-accent-yellow/20 transition-all duration-400">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-yellow/10 flex items-center justify-center text-accent-yellow">
                                        {c.icon}
                                    </div>
                                    <h3 className="font-[Outfit] font-bold text-lg mb-1">{c.label}</h3>
                                    <p className="text-text-muted text-sm">{c.sub}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CORE STRENGTHS ─── */}
            <section className="py-20 border-t border-border-glass">
                <div className="max-w-[1280px] mx-auto px-6">
                    <ScrollReveal className="text-center mb-14">
                        <span className="inline-block text-xs font-bold tracking-[3px] uppercase text-accent-yellow mb-3">Core Strengths</span>
                        <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-black font-[Outfit] mb-4">Why Industries Trust Us</h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {strengths.map((s, i) => (
                            <ScrollReveal key={s.title} delay={i * 80}>
                                <div className="p-8 bg-bg-card border border-border-glass rounded-[20px] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:border-accent-yellow/20 transition-all duration-400 h-full">
                                    <span className="text-3xl mb-4 block">{s.icon}</span>
                                    <h3 className="font-[Outfit] font-bold text-lg mb-3">{s.title}</h3>
                                    <p className="text-text-secondary text-sm leading-[1.8]">{s.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── INDUSTRIES WE SERVE ─── */}
            <section className="py-20 border-t border-border-glass">
                <div className="max-w-[1280px] mx-auto px-6">
                    <ScrollReveal className="text-center mb-14">
                        <span className="inline-block text-xs font-bold tracking-[3px] uppercase text-accent-yellow mb-3">Sectors</span>
                        <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-black font-[Outfit] mb-4">Industries We Serve</h2>
                        <p className="text-text-secondary text-lg max-w-[550px] mx-auto">
                            Delivering safety solutions to sectors where compliance and reliability are non-negotiable.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
                        {industries.map((ind, i) => (
                            <ScrollReveal key={ind.name} delay={i * 70}>
                                <div className="text-center p-6 bg-bg-card border border-border-glass rounded-[20px] hover:-translate-y-1 hover:border-accent-yellow/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-400">
                                    <span className="text-3xl block mb-3">{ind.icon}</span>
                                    <h4 className="font-semibold text-sm">{ind.name}</h4>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="py-20 border-t border-border-glass">
                <div className="max-w-[1280px] mx-auto px-6">
                    <ScrollReveal>
                        <div className="text-center bg-gradient-to-br from-accent-yellow to-accent-orange rounded-[28px] p-12 md:p-16 relative overflow-hidden">
                            {/* Decorative shapes */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                            <div className="relative z-10">
                                <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-black font-[Outfit] text-[#111] mb-4">
                                    Ready to Partner With Us?
                                </h2>
                                <p className="text-[#111]/70 text-lg max-w-[500px] mx-auto mb-8">
                                    Get in touch for bulk orders, rate contracts, or custom PPE requirements.
                                </p>
                                <div className="flex gap-4 justify-center flex-wrap">
                                    <a href="#footer" className="px-8 py-3.5 rounded-full bg-[#111] text-white font-semibold hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300">
                                        Contact Us
                                    </a>
                                    <a href="mailto:guddusarda73@gmail.com" className="px-8 py-3.5 rounded-full bg-white/20 text-[#111] font-semibold border-2 border-[#111]/20 hover:-translate-y-0.5 transition-all duration-300">
                                        📧 guddusarda73@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    )
}
