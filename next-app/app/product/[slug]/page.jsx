import ProductPage from '@/components/ProductPage'

export async function generateMetadata({ params }) {
    const slug = (await params).slug
    return {
        title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | Sarda Industries`,
    }
}

export default function Page() {
    return <ProductPage />
}
