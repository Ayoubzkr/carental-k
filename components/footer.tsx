
import Image from "next/image"
import Link from "next/link"
import { Instagram, ChevronRight } from "lucide-react"

export function Footer() {
  const SnapchatIcon = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 3.031 7.392 7.082 0 4.133-2.604 7.464-6.228 7.464-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
    </svg>
  )

  const links = {
    services: [
      { name: "Location de Voitures", href: "#rental" },
      { name: "Lavage Auto", href: "#wash" },
      { name: "Notre Flotte", href: "#catalog" },
      { name: "Tarifs", href: "#pricing" },
    ],
    company: [
      { name: "À Propos", href: "#about" },
      { name: "Témoignages", href: "#testimonials" },
      { name: "Contact", href: "#contact" },
      { name: "Route de Malabata, Tanger", href: "https://maps.app.goo.gl/K1XK6GjvZgzkNQ8v9" },
      { name: "Carrières", href: "#" },
    ],
    support: [
      { name: "FAQ", href: "/faq" },
      { name: "Conditions Générales", href: "/cgv" },
      { name: "Politique de Confidentialité", href: "/privacy" },
      { name: "Centre d'Assistance", href: "/contact" },
    ]
  }

  return (
    <footer className="relative bg-[#050505] pt-20 pb-10 overflow-hidden">
      {/* Golden Top Border Effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-4 mb-6 group">
              <div className="relative w-16 h-16 rounded-full border border-[#D4AF37] p-1 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500">
                <Image
                  src="/images/k-rim-logo.jpg"
                  alt="K-Rim Car Logo"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <span className="text-3xl font-playfair font-bold text-[#D4AF37] tracking-wider">
                K-RIM CAR
              </span>
            </Link>

            <p className="text-[#888] leading-relaxed mb-8 max-w-sm font-light">
              Location de voitures premium & services de lavage automobile professionnels.
              Excellence, luxe et transparence pour tous vos déplacements à Tanger.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/k_rimcar/?hl=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.snapchat.com/add/K_rimcar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 group"
                aria-label="Snapchat"
              >
                <SnapchatIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Divider 1 */}
          <div className="hidden lg:block lg:col-span-1 border-l border-[#D4AF37]/10 h-full mx-auto"></div>

          {/* Services Column */}
          <div className="lg:col-span-2">
            <h4 className="text-[#D4AF37] font-playfair text-lg uppercase tracking-widest mb-8 border-b border-[#D4AF37]/20 pb-2 inline-block">
              Services
            </h4>
            <ul className="space-y-4">
              {links.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center text-[#888] hover:text-[#D4AF37] transition-colors duration-300">
                    <ChevronRight className="h-3 w-3 mr-2 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise Column */}
          <div className="lg:col-span-2">
            <h4 className="text-[#D4AF37] font-playfair text-lg uppercase tracking-widest mb-8 border-b border-[#D4AF37]/20 pb-2 inline-block">
              Entreprise
            </h4>
            <ul className="space-y-4">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center text-[#888] hover:text-[#D4AF37] transition-colors duration-300">
                    <ChevronRight className="h-3 w-3 mr-2 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-3">
            <h4 className="text-[#D4AF37] font-playfair text-lg uppercase tracking-widest mb-8 border-b border-[#D4AF37]/20 pb-2 inline-block">
              Support
            </h4>
            <ul className="space-y-4">
              {links.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center text-[#888] hover:text-[#D4AF37] transition-colors duration-300">
                    <ChevronRight className="h-3 w-3 mr-2 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D4AF37]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#666] text-sm tracking-wide">
            © 2025 <span className="text-[#D4AF37]">K-RIM CAR</span> — Tous droits réservés.
          </p>
          <p className="text-[#666] text-sm tracking-wide font-playfair italic">
            Conçu avec précision & luxe.
          </p>
        </div>
      </div>
    </footer>
  )
}
