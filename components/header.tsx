"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { usePathname } from "@/navigation" // Utiliser la navigation typée
import { Link } from "@/navigation" // Utiliser le Link typé
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useTranslations } from "next-intl"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/" || pathname === "" // Le pathname de next-intl ne contient pas la locale
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: t('home'), href: "home" },
    { name: t('about'), href: "about" },
    { name: t('services'), href: "services" },
    { name: t('vehicles'), href: "catalog" },
    { name: t('contact'), href: "contact" },
  ]

  const getHref = (id: string) => {
    // Si on est sur la home, on utilise l'ancre seulement pour le scroll smooth (géré par onClick),
    // mais pour le href on met le chemin complet pour le SEO et le fallback.
    // Link de next-intl ajoutera la locale automatiquement.
    return `/#${id}`
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    }
    // Sinon, laisser le Link faire la navigation vers /locale/#id
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "bg-black/95 backdrop-blur-md border-b border-white/10" : "bg-transparent/50 backdrop-blur-sm"
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
                key={item.href}
                href={getHref(item.href)}
                className="text-sm font-mono uppercase tracking-wider text-white/80 hover:text-[#D4AF37] transition-colors"
                onClick={(e) => handleNavClick(e, item.href)}
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
                const message = tCommon('bookNow') + "..." // Simplifié
                const whatsappUrl = `https://wa.me/212665123330?text=${encodeURIComponent("Bonjour/Hi")}`
                window.open(whatsappUrl, "_blank")
              }}
            >
              {tCommon('bookNow')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
              {isMobileMenuOpen ? <X className="h-6 w-6 text-[#D4AF37]" /> : <Menu className="h-6 w-6 text-[#D4AF37]" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-white/10 bg-black">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={getHref(item.href)}
                  className="text-sm font-mono uppercase tracking-wider text-white/80 hover:text-[#D4AF37] transition-colors px-4"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4">
                <Button
                  className="w-full mt-2 bg-[#D4AF37] text-black hover:bg-[#b0912d]"
                  onClick={() => {
                    const whatsappUrl = `https://wa.me/212665123330`
                    window.open(whatsappUrl, "_blank")
                  }}
                >
                  {tCommon('bookNow')}
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
