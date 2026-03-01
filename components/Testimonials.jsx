import ScrollReveal from './ScrollReveal'

const testimonials = [
    {
        initials: 'RK',
        name: 'Rajesh Kumar',
        role: 'Safety Director, Tata Projects Ltd.',
        rating: 5,
        text: 'Sarda Industries has been our go-to supplier for 3 years. Their steel toe boots are incredibly durable and the bulk pricing helped us save over 30% on our annual safety budget.',
    },
    {
        initials: 'PS',
        name: 'Priya Sharma',
        role: 'Procurement Head, L&T Construction',
        rating: 5,
        text: 'We outfitted 2,000+ workers across 12 construction sites. The quality of their helmets and reflective jackets is unmatched. Their dedicated support team made the process seamless.',
    },
    {
        initials: 'AM',
        name: 'Arun Mehta',
        role: 'Plant Manager, JSW Steel',
        rating: 4,
        text: "Fast delivery and excellent product quality. The cut-resistant gloves are a game changer for our metalworking division. We've seen a 45% reduction in hand injuries since switching.",
    },
]

export default function Testimonials() {
    return (
        <section className="py-24 bg-gradient-to-b from-transparent via-accent-yellow/[0.015] to-transparent" id="testimonials">
            <div className="max-w-[1280px] mx-auto px-6">
                <ScrollReveal className="text-center mb-14">
                    <span className="inline-block text-xs font-bold tracking-[3px] uppercase text-accent-yellow mb-3">Client Reviews</span>
                    <h2 className="text-[clamp(2rem,4vw,3rem)] font-black mb-4">Trusted by Industry Leaders</h2>
                    <p className="text-text-secondary text-lg max-w-[600px] mx-auto">
                        Don't just take our word for it — hear from the professionals who trust Sarda Industries.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <ScrollReveal key={t.name} delay={i * 120}>
                            <div className="bg-bg-card border border-border-glass rounded-[20px] p-9 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-400">
                                <div className="text-5xl font-serif text-accent-yellow/30 leading-none mb-3">"</div>
                                <div className="flex gap-0.5 text-star text-sm mb-4">
                                    {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                                </div>
                                <p className="text-text-secondary text-[0.95rem] leading-[1.8] italic mb-6">{t.text}</p>
                                <div className="flex items-center gap-3.5">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-yellow to-accent-orange flex items-center justify-center font-[Outfit] font-extrabold text-[#111]">
                                        {t.initials}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[0.95rem]">{t.name}</h4>
                                        <span className="text-text-muted text-xs">{t.role}</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
