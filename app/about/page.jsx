import AboutPage from '@/components/AboutPage'

export const metadata = {
    title: 'About Us — Trusted Safety Products Supplier Since 1990',
    description:
        'Learn about Sarda Safety Industries — a leading industrial safety products supplier based in Kolkata, India. Manufacturers of safety shoes, safety gloves, rubber gloves, safety gumboots & traffic safety equipment since 1990.',
    keywords: [
        'about sarda safety industries',
        'safety products supplier kolkata',
        'industrial safety manufacturer india',
        'safety equipment company kolkata',
    ],
    alternates: {
        canonical: 'https://sardasafetyindustries.com/about',
    },
    openGraph: {
        title: 'About Sarda Safety Industries — Safety Products Supplier Since 1990',
        description:
            'Trusted manufacturer & supplier of industrial safety products in Kolkata, India. Safety shoes, gloves, gumboots & more.',
        url: 'https://sardasafetyindustries.com/about',
    },
}

export default function Page() {
    return <AboutPage />
}
