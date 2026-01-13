'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Car, Sparkles, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { FadeIn, StaggerContainer, ScaleIn } from "@/components/ui/motion-wrapper"

export function Services() {
  const t = useTranslations("services")
  const tCommon = useTranslations("common")

  const services = [
    {
      id: "rental",
      icon: Car,
      title: t("rental.title"),
      description: t("rental.description"),
      features: [
        t("rental.features.fleet"),
        t("rental.features.flex"),
        t("rental.features.insurance"),
        t("rental.features.delivery"),
      ],
      image: "/location-voiture-luxe-tanger-krim-car.jpg",
      alt: "Location de voiture de luxe à Tanger – KRIM CAR",
    },
    {
      id: "wash",
      icon: Sparkles,
      title: t("wash.title"),
      description: t("wash.description"),
      features: [
        t("wash.features.detailing"),
        t("wash.features.protection"),
        t("wash.features.products"),
        t("wash.features.experts"),
      ],
      image: "/lavage-auto-tanger-luxe-krim-car.jpg",
      alt: "Lavage automobile professionnel à Tanger – KRIM CAR",
    },
  ]

  const trustIndicators = [
    { icon: Shield, value: t("trust.secure.value"), label: t("trust.secure.label") },
    { icon: Clock, value: t("trust.support.value"), label: t("trust.support.label") },
    { icon: Car, value: t("trust.vehicles.value"), label: t("trust.vehicles.label") },
    { icon: Sparkles, value: t("trust.clients.value"), label: t("trust.clients.label") },
  ]

  return (
    <section className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4">
        {/* Header Animated */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-2 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">{t("badge")}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-balance font-playfair">{t("title")}</h2>

          <p className="text-lg text-white/60 text-balance">
            {t("subtitle")}
          </p>
        </FadeIn>

        {/* Services List Animated */}
        <div className="space-y-24">
          {services.map((service, index) => (
            <FadeIn
              key={service.id}
              direction={index % 2 === 0 ? "right" : "left"}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <Card className="bg-[#121212] border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <service.icon className="h-8 w-8 text-[#D4AF37]" />
                    </div>

                    <h3 className="text-3xl font-bold mb-4 font-playfair text-white">{service.title}</h3>

                    <p className="text-white/60 mb-8 leading-relaxed text-lg">{service.description}</p>

                    <div className="space-y-4 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          <span className="text-white/80">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => {
                        const targetId = service.id === 'wash' ? 'pricing' : 'catalog'
                        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="bg-[#D4AF37] text-black hover:bg-[#b0912d] transition-colors px-8 py-6 text-lg"
                    >
                      {tCommon("readMore")}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-white/10 group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.alt || service.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Trust Indicators Animated */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
          {trustIndicators.map((item, idx) => (
            <ScaleIn key={idx} delay={idx * 0.1}>
              <Card className="bg-[#111] border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <item.icon className="h-8 w-8 text-[#D4AF37] mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2 font-playfair rtl:flex-row-reverse">{item.value}</div>
                  <div className="text-xs text-white/40 font-mono uppercase tracking-widest">{item.label}</div>
                </CardContent>
              </Card>
            </ScaleIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
