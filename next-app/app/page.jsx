"use client"
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BestSellers from '../components/BestSellers'
import WhyChooseUs from '../components/WhyChooseUs'
import BulkOrder from '../components/BulkOrder'
import Testimonials from '../components/Testimonials'
import CTASection from '../components/CTASection'

export default function LandingPage() {
    return (
        <>
            <Hero />
            <Categories />
            <BestSellers />
            <WhyChooseUs />
            <BulkOrder />
            <Testimonials />
            <CTASection />
        </>
    )
}
