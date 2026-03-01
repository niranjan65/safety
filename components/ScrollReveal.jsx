"use client"
import { useEffect, useRef } from 'react'

export function useScrollReveal() {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('animate-fade-up')
                    observer.unobserve(el)
                }
            },
            { rootMargin: '0px 0px -60px 0px', threshold: 0.15 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return ref
}

export default function ScrollReveal({ children, className = '', delay = 0 }) {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        el.style.opacity = '0'
        el.style.transform = 'translateY(40px)'

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        el.style.transition = 'opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)'
                        el.style.opacity = '1'
                        el.style.transform = 'translateY(0)'
                    }, delay)
                    observer.unobserve(el)
                }
            },
            { rootMargin: '0px 0px -60px 0px', threshold: 0.12 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [delay])

    return <div ref={ref} className={className}>{children}</div>
}
