"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Accueil", href: "home" },
    { name: "À Propos", href: "about" },
    { name: "Location", href: "rental" },
    { name: "Lavage", href: "wash" },
    { name: "Véhicules", href: "catalog" },
    // "Tarifs" removed
    { name: "Témoignages", href: "testimonials" },
    { name: "Contact", href: "contact" },
  ]

  const getHref = (id: string) => {
    return isHome ? `#${id}` : `/#${id}`
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || !isHome ? "bg-black/95 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/k-rim-logo.jpg" alt="K-Rim Car Logo" width={50} height={50} className="rounded-full border border-[#D4AF37]/50" />
            <span className="text-2xl font-playfair font-bold text-[#D4AF37]">K-RIM CAR</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={getHref(item.href)}
                className="text-sm font-mono uppercase tracking-wider text-white/80 hover:text-[#D4AF37] transition-colors"
                onClick={() => {
                  if (isHome) {
                    const el = document.getElementById(item.href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="outline"
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent transition-all"
              onClick={() => {
                const message = "Bonjour, je souhaite réserver un véhicule."
                const whatsappUrl = `https://wa.me/212665123330?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, "_blank")
              }}
            >
              Réserver
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="h-6 w-6 text-[#D4AF37]" /> : <Menu className="h-6 w-6 text-[#D4AF37]" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-white/10 bg-black">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={getHref(item.href)}
                  className="text-sm font-mono uppercase tracking-wider text-white/80 hover:text-[#D4AF37] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                className="mt-2 bg-[#D4AF37] text-black hover:bg-[#b0912d]"
                onClick={() => {
                  const message = "Bonjour, je souhaite réserver un véhicule."
                  const whatsappUrl = `https://wa.me/212665123330?text=${encodeURIComponent(message)}`
                  window.open(whatsappUrl, "_blank")
                }}
              >
                Réserver
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
