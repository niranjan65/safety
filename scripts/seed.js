
const mongoose = require('mongoose')
const Product = require('../lib/models/Product')
const Category = require('../lib/models/Category')

const categories = [
    { name: 'Safety Shoes', slug: 'safety-shoes', image: '/images/steel-toe-shoes.png', subtitle: 'Hillson · Agarson · Mallcom' },
    { name: 'Leather Gloves', slug: 'leather-gloves', image: '/images/leather-gloves.png', subtitle: null },
    { name: 'Electrical Gloves', slug: 'electrical-gloves', image: '/images/electrical-gloves.png', subtitle: null },
    { name: 'Heat Resistant Gloves', slug: 'heat-resistant-gloves', image: '/images/heat-resistant-gloves.png', subtitle: null },
    { name: 'Reflective Jackets', slug: 'reflective-jackets', image: '/images/reflective-jacket.png', subtitle: null },
    { name: 'Safety Helmets', slug: 'safety-helmets', image: '/images/safety-helmet.png', subtitle: null },
    { name: 'Safety Goggles', slug: 'safety-goggles', image: '/images/safety-goggles.png', subtitle: null },
]

const products = [
    {
        name: 'Hillson Steel Toe Safety Shoes',
        slug: 'hillson-steel-toe-safety-shoes',
        category: 'safety-shoes',
        images: ['/images/steel-toe-shoes.png'],
        shortDescription: 'Hillson steel toe safety shoes with oil resistant sole, anti-skid outsole, and heat resistant construction.',
        description: 'Heavy-duty steel toe safety shoes from Hillson — engineered for maximum foot protection in construction, manufacturing, and industrial environments. Features oil resistant sole, anti-skid outsole, and steel toe cap for impact protection.',
        highlights: [{ icon: '🦶', text: 'Steel Toe Cap' }, { icon: '🛢️', text: 'Oil Resistant' }, { icon: '🔥', text: 'Heat Resistant' }, { icon: '🚫', text: 'Anti-Skid' }],
        specs: [{ key: 'Brand', value: 'Hillson' }, { key: 'Toe Type', value: 'Steel Toe Cap' }, { key: 'Sole', value: 'PU / Rubber Oil Resistant' }, { key: 'Upper', value: 'Genuine Leather' }, { key: 'Features', value: 'Anti-skid, Heat Resistant' }],
        badge: 'bestseller', rating: 5, reviews: 412, sizes: ['6', '7', '8', '9', '10', '11', '12'],
        applications: ['Construction sites', 'Manufacturing plants', 'Warehousing', 'Mining', 'Oil & Gas'],
    },
    {
        name: 'Agarson Oil Resistant Shoes',
        slug: 'agarson-oil-resistant-shoes',
        category: 'safety-shoes',
        images: ['/images/steel-toe-shoes.png'],
        shortDescription: 'Agarson safety shoes with oil resistant sole and steel toe for industrial protection.',
        description: 'Reliable safety footwear from Agarson with steel toe cap and oil resistant sole. Designed for workers in manufacturing, construction, and heavy industries.',
        highlights: [{ icon: '🛢️', text: 'Oil Resistant' }, { icon: '🦶', text: 'Steel Toe' }, { icon: '💪', text: 'Durable' }, { icon: '🚫', text: 'Anti-Skid' }],
        specs: [{ key: 'Brand', value: 'Agarson' }, { key: 'Toe Type', value: 'Steel Toe Cap' }, { key: 'Sole', value: 'Oil Resistant' }, { key: 'Upper', value: 'Leather' }],
        badge: 'bestseller', rating: 5, reviews: 287, sizes: ['6', '7', '8', '9', '10', '11'],
        applications: ['Manufacturing', 'Construction', 'Warehousing', 'Heavy industries'],
    },
    {
        name: 'Mallcom Anti-Skid Safety Shoes',
        slug: 'mallcom-anti-skid-safety-shoes',
        category: 'safety-shoes',
        images: ['/images/steel-toe-shoes.png'],
        shortDescription: 'Mallcom (India) Ltd. anti-skid safety shoes with steel toe and industrial-grade outsole.',
        description: 'Premium safety shoes from Mallcom — anti-skid outsole with steel toe protection. Built for demanding industrial environments with emphasis on grip and durability.',
        highlights: [{ icon: '🚫', text: 'Anti-Skid' }, { icon: '🦶', text: 'Steel Toe' }, { icon: '🔥', text: 'Heat Resistant' }, { icon: '💧', text: 'Water Resistant' }],
        specs: [{ key: 'Brand', value: 'Mallcom (India) Ltd.' }, { key: 'Toe Type', value: 'Steel Toe Cap' }, { key: 'Sole', value: 'Anti-Skid Outsole' }, { key: 'Upper', value: 'Leather' }],
        badge: 'new', rating: 4, reviews: 198, sizes: ['6', '7', '8', '9', '10', '11', '12'],
        applications: ['Construction', 'Manufacturing', 'Oil & Gas', 'Infrastructure projects'],
    },
    {
        name: 'Chrome Leather Gloves 12"',
        slug: 'chrome-leather-gloves-12',
        category: 'leather-gloves',
        images: ['/images/leather-gloves.png'],
        shortDescription: 'Premium chrome/split leather industrial gloves — 12 inch length with Kevlar thread stitching. Designed for welding, fabrication, construction, and heavy engineering applications.',
        description: 'The Chrome Leather Safety Gloves (12") from Sarda Industries are engineered for maximum hand protection in demanding industrial environments. Crafted from premium chrome/split leather with a thickness of 1.1–1.3mm, these gloves deliver outstanding durability and abrasion resistance. Featuring Kevlar thread stitching for superior seam strength. Available with optional cotton fleece lining.',
        highlights: [{ icon: '🧤', text: 'Abrasion Resistant' }, { icon: '🔥', text: 'Heat Protection' }, { icon: '✊', text: 'High Grip Performance' }, { icon: '🧵', text: 'Kevlar Stitching' }],
        specs: [
            { key: 'Material', value: 'Chrome / Split Leather' }, { key: 'Thickness', value: '1.1mm – 1.3mm' },
            { key: 'Length', value: '12 inch' }, { key: 'Stitching', value: 'Kevlar Thread' },
            { key: 'Cuff Type', value: 'Safety Cuff / Gauntlet' }, { key: 'Lining', value: 'Cotton Fleece (Optional)' },
            { key: 'Color', value: 'Natural / Grey' }, { key: 'Abrasion', value: 'High Abrasion Resistance' },
            { key: 'Heat Protection', value: 'Moderate Heat Protection' }, { key: 'Manufacturing', value: 'Industrial Grade — Batch Inspected' },
        ],
        badge: 'bestseller', rating: 5, reviews: 312, sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        applications: ['Welding & metal fabrication', 'Construction & civil engineering', 'Heavy engineering & manufacturing', 'Oil & Gas operations', 'Infrastructure projects'],
    },
    {
        name: 'Electrical Gloves 33KV',
        slug: 'electrical-gloves-33kv',
        category: 'electrical-gloves',
        images: ['/images/electrical-gloves.png'],
        shortDescription: 'High dielectric rubber electrical gloves rated for 33KV. Leakage tested and certified for electrical safety.',
        description: 'Industrial-grade electrical insulation gloves rated for 33,000 Volts. Made from high-quality dielectric rubber with individual leakage testing. Essential for electrical maintenance and line work.',
        highlights: [{ icon: '⚡', text: '33KV Rated' }, { icon: '🧪', text: 'Leakage Tested' }, { icon: '🛡️', text: 'Certified' }, { icon: '🧤', text: 'Dielectric Rubber' }],
        specs: [{ key: 'Material', value: 'High Dielectric Rubber' }, { key: 'Voltage Rating', value: '33KV' }, { key: 'Testing', value: 'Individual Leakage Test' }, { key: 'Color', value: 'Orange / Yellow' }],
        badge: null, rating: 5, reviews: 187, sizes: ['S', 'M', 'L', 'XL'],
        applications: ['Electrical maintenance', 'Power line work', 'Substations', 'Utility companies'],
    },
    {
        name: 'Heat Resistant Furnace Gloves',
        slug: 'heat-resistant-furnace-gloves',
        category: 'heat-resistant-gloves',
        images: ['/images/heat-resistant-gloves.png'],
        shortDescription: 'Furnace/foundry grade heat resistant gloves with reinforced palm and high-temperature protection.',
        description: 'Heavy-duty heat resistant gloves designed for furnace and foundry operations. Reinforced palm with high-temperature ceramic fiber protection for extreme heat environments.',
        highlights: [{ icon: '🔥', text: 'Extreme Heat' }, { icon: '🧤', text: 'Reinforced Palm' }, { icon: '🏭', text: 'Foundry Grade' }, { icon: '🛡️', text: 'Ceramic Fiber' }],
        specs: [{ key: 'Material', value: 'Asbestos-Free / Ceramic Fiber' }, { key: 'Temperature', value: 'Up to 500°C' }, { key: 'Palm', value: 'Reinforced Leather' }, { key: 'Length', value: '14 inch / 18 inch' }],
        badge: 'new', rating: 4, reviews: 145, sizes: ['M', 'L', 'XL', 'XXL'],
        applications: ['Furnace operations', 'Foundry work', 'Glass manufacturing', 'Steel plants'],
    },
    {
        name: 'HiViz Reflective Safety Jacket',
        slug: 'hiviz-reflective-safety-jacket',
        category: 'reflective-jackets',
        images: ['/images/reflective-jacket.png'],
        shortDescription: 'High visibility reflective safety jacket with polyester shell and high-vis tape for construction and roadwork.',
        description: 'EN-20471 compliant high visibility reflective safety jacket. Polyester shell with 2-inch reflective tape for maximum visibility in low-light conditions.',
        highlights: [{ icon: '🔶', text: 'High Visibility' }, { icon: '🌙', text: 'Night Visible' }, { icon: '🧥', text: 'Lightweight' }, { icon: '✅', text: 'EN-20471' }],
        specs: [{ key: 'Material', value: 'Polyester' }, { key: 'Tape', value: '2" High-Vis Reflective' }, { key: 'Compliance', value: 'EN-20471' }, { key: 'Sizes', value: 'M – XXL' }],
        badge: 'bestseller', rating: 5, reviews: 276, sizes: ['M', 'L', 'XL', 'XXL'],
        applications: ['Construction sites', 'Road work', 'Traffic management', 'Night operations'],
    },
    {
        name: 'HDPE Industrial Safety Helmet',
        slug: 'hdpe-industrial-safety-helmet',
        category: 'safety-helmets',
        images: ['/images/safety-helmet.png'],
        shortDescription: 'HDPE construction safety helmet with 6-point suspension system and adjustable ratchet.',
        description: 'Industrial-grade HDPE safety helmet with 6-point suspension for optimal impact distribution. Adjustable ratchet mechanism for secure fit. Compliant with IS 2925.',
        highlights: [{ icon: '⛑️', text: 'HDPE Shell' }, { icon: '🔧', text: '6-Point Suspension' }, { icon: '🔄', text: 'Adjustable Ratchet' }, { icon: '✅', text: 'IS 2925' }],
        specs: [{ key: 'Material', value: 'HDPE' }, { key: 'Suspension', value: '4/6 Point' }, { key: 'Adjustment', value: 'Ratchet' }, { key: 'Compliance', value: 'IS 2925' }],
        badge: null, rating: 4, reviews: 245, sizes: ['Standard'],
        applications: ['Construction', 'Mining', 'Manufacturing', 'Infrastructure'],
    },
]

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('✅ Connected to MongoDB')

        // Clear existing data
        await Product.deleteMany({})
        await Category.deleteMany({})
        console.log('🗑️  Cleared existing data')

        // Insert categories
        await Category.insertMany(categories)
        console.log(`📁 Inserted ${categories.length} categories`)

        // Insert products
        await Product.insertMany(products)
        console.log(`📦 Inserted ${products.length} products`)

        console.log('\n✅ Database seeded successfully!')
        process.exit(0)
    } catch (err) {
        console.error('❌ Seed error:', err.message)
        process.exit(1)
    }
}

seed()
