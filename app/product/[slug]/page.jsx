import ProductPage from '@/components/ProductPage'

const keywordMap = {
    'safety-shoes': {
        keywords: 'safety shoes, steel toe safety shoes, industrial safety shoes, safety footwear supplier india',
        desc: 'Buy premium safety shoes — steel toe, oil resistant, anti-skid industrial safety footwear from Sarda Safety Industries, Kolkata.',
    },
    'leather-gloves': {
        keywords: 'leather gloves, safety gloves, chrome leather gloves, industrial gloves supplier',
        desc: 'Industrial grade leather safety gloves with Kevlar stitching. Abrasion resistant, heat protection gloves from Sarda Safety Industries.',
    },
    'electrical-gloves': {
        keywords: 'electrical gloves, rubber gloves, insulated gloves, dielectric gloves, electrical safety',
        desc: 'High voltage electrical insulation rubber gloves — 33KV rated, leakage tested. Electrical safety gloves from Sarda Safety Industries.',
    },
    'heat-resistant-gloves': {
        keywords: 'heat resistant gloves, furnace gloves, safety gloves, industrial gloves',
        desc: 'Heavy-duty heat resistant furnace gloves with reinforced palm. Industrial safety gloves from Sarda Safety Industries, Kolkata.',
    },
    'reflective-jackets': {
        keywords: 'reflective jackets, traffic safety, hi-vis jacket, safety jacket, traffic safety products',
        desc: 'High visibility reflective safety jackets for traffic safety & construction. EN-20471 compliant from Sarda Safety Industries.',
    },
    'safety-helmets': {
        keywords: 'safety helmets, industrial safety helmet, HDPE helmet, construction helmet',
        desc: 'HDPE industrial safety helmets with 6-point suspension. IS 2925 compliant safety helmets from Sarda Safety Industries.',
    },
    'safety-goggles': {
        keywords: 'safety goggles, industrial safety goggles, protective eyewear, safety glasses',
        desc: 'Industrial safety goggles for eye protection. Anti-fog, impact resistant safety eyewear from Sarda Safety Industries.',
    },
    'safety-gumboots': {
        keywords: 'safety gumboots, rubber gumboots, industrial gumboots, safety boots india',
        desc: 'Industrial safety gumboots — chemical resistant, anti-slip rubber gumboots from Sarda Safety Industries, Kolkata.',
    },
    'rubber-gloves': {
        keywords: 'rubber gloves, industrial rubber gloves, chemical resistant gloves, safety gloves',
        desc: 'Industrial rubber gloves for chemical handling & electrical safety. Durable rubber safety gloves from Sarda Safety Industries.',
    },
}

export async function generateMetadata({ params }) {
    const slug = (await params).slug
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    const seoData = keywordMap[slug]

    return {
        title: `${title} — Buy from Trusted Supplier | Sarda Safety Industries`,
        description: seoData?.desc ||
            `Buy ${title} from Sarda Safety Industries — leading safety products supplier in Kolkata, India. Premium quality industrial safety equipment.`,
        keywords: seoData?.keywords ||
            `${title.toLowerCase()}, safety products, industrial safety, supplier india, kolkata`,
        alternates: {
            canonical: `https://www.sardasafetyindustries.com/product/${slug}`,
        },
        openGraph: {
            title: `${title} — Sarda Safety Industries`,
            description: seoData?.desc ||
                `Buy ${title} from Sarda Safety Industries, Kolkata. Premium industrial safety products supplier.`,
            url: `https://www.sardasafetyindustries.com/product/${slug}`,
            type: 'website',
        },
    }
}

export default function Page() {
    return <ProductPage />
}
