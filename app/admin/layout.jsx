"use client"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminLayout({ children }) {
    const pathname = usePathname()
    const router = useRouter()

    // Hide sidebar on the login page
    if (pathname === '/admin/login') {
        return children
    }

    const handleLogout = async () => {
        // Basic logout by clearing cookie and redirecting
        document.cookie = 'admin_auth=; Max-Age=0; path=/;'
        router.push('/admin/login')
    }

    return (
        <div className="min-h-screen bg-bg-dark flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#16161a] border-r border-[#22222a] flex flex-col hidden md:flex">
                <div className="p-6 border-b border-[#22222a]">
                    <Link href="/" className="flex items-center gap-2 font-[Outfit] font-black text-xl text-text-primary">
                        <div className="w-8 h-8 bg-gradient-to-br from-accent-yellow to-accent-orange rounded-lg flex items-center justify-center text-[#111]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        </div>
                        ADMIN <span className="text-accent-yellow">PANEL</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/admin' ? 'bg-accent-yellow/10 text-accent-yellow font-semibold' : 'text-text-secondary hover:bg-white/[0.04] hover:text-text-primary'
                            }`}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/products"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname.startsWith('/admin/products') ? 'bg-accent-yellow/10 text-accent-yellow font-semibold' : 'text-text-secondary hover:bg-white/[0.04] hover:text-text-primary'
                            }`}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        Products
                    </Link>
                </nav>

                <div className="p-4 border-t border-[#22222a]">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 border-b border-[#22222a] bg-[#16161a]">
                    <Link href="/admin" className="font-[Outfit] font-black text-lg">Admin</Link>
                    <button onClick={handleLogout} className="text-sm text-red-400">Sign Out</button>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    <div className="max-w-[1200px] mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}
