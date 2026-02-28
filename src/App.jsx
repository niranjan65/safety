import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import BestSellers from './components/BestSellers'
import WhyChooseUs from './components/WhyChooseUs'
import BulkOrder from './components/BulkOrder'
import Testimonials from './components/Testimonials'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import ProductPage from './components/ProductPage'
import AboutPage from './components/AboutPage'

function LandingPage() {
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

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
