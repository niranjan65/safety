import './globals.css'
import LayoutShell from '../components/LayoutShell'

export const metadata = {
    metadataBase: new URL('https://www.sardasafetyindustries.com'),
    title: {
        default: 'Sarda Safety Industries | Safety Shoes, Gloves & Industrial Safety Products Supplier in Kolkata, India',
        template: '%s | Sarda Safety Industries',
    },
    description:
        'Sarda Safety Industries — Leading manufacturer & supplier of safety shoes, safety gloves, rubber gloves, safety gumboots, industrial safety equipment, traffic safety products & PPE solutions in Kolkata, India. Serving Oil & Gas, EPC, Infrastructure & Government sectors pan-India since 1990.',
    keywords: [
        'safety shoes',
        'safety gloves',
        'safety gumboots',
        'industrial safety',
        'traffic safety',
        'rubber gloves',
        'safety products supplier',
        'safety products kolkata',
        'safety products india',
        'PPE supplier india',
        'industrial safety equipment',
        'safety helmet',
        'reflective jacket',
        'electrical gloves',
        'leather gloves',
        'Sarda Safety Industries',
    ],
    authors: [{ name: 'Sarda Safety Industries' }],
    creator: 'Sarda Safety Industries',
    publisher: 'Sarda Safety Industries',
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://www.sardasafetyindustries.com',
        siteName: 'Sarda Safety Industries',
        title: 'Sarda Safety Industries | Safety Shoes, Gloves & Industrial Safety Products — Kolkata, India',
        description:
            'Leading manufacturer & supplier of safety shoes, safety gloves, rubber gloves, gumboots, industrial & traffic safety products in Kolkata, India. Quality PPE since 1990.',
        images: [
            {
                url: '/images/hero-banner.png',
                width: 1200,
                height: 630,
                alt: 'Sarda Safety Industries — Industrial Safety Equipment',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sarda Safety Industries | Safety Shoes, Gloves & Industrial Safety Products',
        description:
            'Leading supplier of safety shoes, safety gloves, rubber gloves, gumboots & industrial safety equipment in Kolkata, India.',
        images: ['/images/hero-banner.png'],
    },
    alternates: {
        canonical: 'https://www.sardasafetyindustries.com',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        // Add your Google Search Console verification code here
        // google: 'your-verification-code',
    },
}

// JSON-LD Structured Data
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sarda Safety Industries',
    url: 'https://www.sardasafetyindustries.com',
    logo: 'https://www.sardasafetyindustries.com/images/hero-banner.png',
    description:
        'Leading manufacturer & supplier of safety shoes, safety gloves, rubber gloves, safety gumboots, industrial safety equipment, and traffic safety products in Kolkata, India.',
    foundingDate: '1990',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kolkata',
        addressRegion: 'West Bengal',
        addressCountry: 'IN',
    },
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [],
    knowsAbout: [
        'Safety Shoes',
        'Safety Gloves',
        'Rubber Gloves',
        'Safety Gumboots',
        'Industrial Safety Equipment',
        'Traffic Safety Products',
        'PPE Equipment',
        'Reflective Jackets',
        'Safety Helmets',
        'Electrical Gloves',
    ],
}

const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Sarda Safety Industries',
    url: 'https://www.sardasafetyindustries.com',
    image: 'https://www.sardasafetyindustries.com/images/hero-banner.png',
    description:
        'Manufacturer & supplier of safety shoes, safety gloves, rubber gloves, gumboots & industrial safety products in Kolkata, India.',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kolkata',
        addressRegion: 'West Bengal',
        addressCountry: 'IN',
    },
    priceRange: '$$',
    openingHours: 'Mo-Sa 09:00-18:00',
    areaServed: {
        '@type': 'Country',
        name: 'India',
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
                />
            </head>
            <body className="antialiased font-sans">
                <LayoutShell>{children}</LayoutShell>
            </body>
        </html>
    )
}
