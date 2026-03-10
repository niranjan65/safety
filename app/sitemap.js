const BASE_URL = 'https://www.sardasafetyindustries.com'

export default function sitemap() {
    const staticPages = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]

    // Category pages
    const categories = [
        'safety-shoes',
        'leather-gloves',
        'electrical-gloves',
        'heat-resistant-gloves',
        'reflective-jackets',
        'safety-helmets',
        'safety-goggles',
        'safety-gumboots',
        'rubber-gloves',
        'traffic-safety',
    ]

    const categoryPages = categories.map(slug => ({
        url: `${BASE_URL}/product/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }))

    return [...staticPages, ...categoryPages]
}
