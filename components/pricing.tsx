"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function Pricing() {
  const washPackages = [
    {
      name: "Lavage Express",
      description: "Nettoyage extérieur rapide",
      price: 100,
      features: ["Lavage extérieur à la main", "Brillance des pneus", "Nettoyage des vitres", "Séchage rapide"],
    },
    {
      name: "Detailing Premium",
      description: "Complet intérieur et extérieur",
      price: 250,
      popular: true,
      features: [
        "Lavage extérieur complet",
        "Aspiration intérieure",
        "Nettoyage tableau de bord",
        "Nettoyage des vitres",
        "Brillance des pneus",
        "Application de cire",
      ],
    },
    {
      name: "Package Luxe",
      description: "Traitement de soin ultime",
      price: 450,
      features: [
        "Tout du Premium inclus",
        "Traitement clay bar",
        "Correction de peinture",
        "Revêtement céramique",
        "Conditionnement du cuir",
        "Nettoyage du compartiment moteur",
      ],
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-2 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5">
            <span className="text-sm font-mono uppercase tracking-wider text-[#D4AF37]">Nos Tarifs Lavage</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-white text-balance">
            Services de Lavage Premium
          </h2>

          <p className="text-lg text-white/60 text-balance">
            Des forfaits de nettoyage et de detailing adaptés à l'excellence de votre véhicule
          </p>
        </div>

        {/* Car Wash Pricing */}
        <div className="relative py-10 px-4 md:px-0">
          <div className="relative">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {washPackages.map((pkg) => (
                <Card
                  key={pkg.name}
                  className={`relative border transition-all duration-300 hover:-translate-y-2 group ${pkg.popular
                      ? "border-[#D4AF37]/50 bg-black"
                      : "border-white/10 bg-black/50"
                    }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider border border-black">
                      Populaire
                    </div>
                  )}

                  <CardHeader className="text-center pb-6 pt-10">
                    <h4 className="text-2xl font-playfair font-bold mb-2 text-white group-hover:text-[#D4AF37] transition-colors">{pkg.name}</h4>
                    <p className="text-sm text-white/50 mb-6">{pkg.description}</p>
                    <div className="mb-2 flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-white">{pkg.price}</span>
                      <span className="text-lg text-[#D4AF37]">MAD</span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 px-8 pb-8">
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                          <span className="text-white/70 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full py-6 text-base font-semibold group-hover:bg-[#D4AF37] group-hover:text-black transition-all ${pkg.popular
                          ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50"
                          : "bg-white/5 text-white border border-white/10"
                        }`}
                    >
                      Réserver
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
