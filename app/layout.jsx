import './globals.css'
import LayoutShell from '../components/LayoutShell'

export const metadata = {
    title: 'Sarda Industries | B2B Industrial Safety Equipment',
    description: 'Leading manufacturer & supplier of industrial safety equipment and PPE solutions.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased font-sans">
                <LayoutShell>{children}</LayoutShell>
            </body>
        </html>
    )
}
