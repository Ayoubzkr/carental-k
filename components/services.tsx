'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Car, Sparkles, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Services() {
  const services = [
    {
      id: "rental",
      icon: Car,
      title: "Location de Voitures de Luxe",
      description:
        "Explorez notre flotte haut de gamme soigneusement sélectionnée. Idéale pour les déplacements professionnels, les événements prestigieux ou simplement pour profiter du plaisir de conduire un véhicule d’exception.",
      features: [
        "Flotte de véhicules premium soigneusement sélectionnés",
        "Options de location flexibles (court & long terme)",
        "Assurance complète incluse",
        "Service de livraison et récupération offertes",
      ],
      image: "/location-voiture-luxe-tanger-krim-car.jpg",
      alt: "Location de voiture de luxe à Tanger – KRIM CAR",
    },
    {
      id: "wash",
      icon: Sparkles,
      title: "Lavage Automobile Professionnel",
      description:
        "Un service de lavage et de detailing professionnel conçu pour préserver l’éclat, la valeur et l’élégance de votre véhicule, avec des produits haut de gamme et des techniques expertes.",
      features: [
        "Detailing intérieur & extérieur haut de gamme",
        "Traitements avancés de protection carrosserie",
        "Produits professionnels de qualité supérieure",
        "Service rapide et réalisé par des experts",
      ],
      image: "/lavage-auto-tanger-luxe-krim-car.jpg",
      alt: "Lavage automobile professionnel à Tanger – KRIM CAR",
    },
  ]

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-2 border border-primary/30 rounded-full">
            <span className="text-xs font-mono uppercase tracking-wider text-primary">Nos Services</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Des Services d’Excellence Pensés Pour Vous</h2>

          <p className="text-lg text-foreground/70 text-balance">
            Découvrez l’alliance parfaite du luxe, du professionnalisme et d’un service haut de gamme.
          </p>
        </div>

        <div className="space-y-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <Card className="bg-card border-primary/20">
                  <CardContent className="p-8">
                    <service.icon className="h-12 w-12 text-primary mb-6" />

                    <h3 className="text-3xl font-bold mb-4">{service.title}</h3>

                    <p className="text-foreground/70 mb-6 leading-relaxed">{service.description}</p>

                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                          <span className="text-foreground/80">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => {
                        const targetId = service.id === 'wash' ? 'pricing' : 'catalog'
                        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      En Savoir Plus
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="relative h-[400px] rounded-lg overflow-hidden border border-primary/20">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.alt || service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
          <Card className="bg-card/50 border-primary/10">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-foreground/60 font-mono uppercase tracking-wider">Sécurisé</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-primary/10">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-foreground/60 font-mono uppercase tracking-wider">Support Dédié</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-primary/10">
            <CardContent className="p-6 text-center">
              <Car className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-foreground/60 font-mono uppercase tracking-wider">Véhicules Premium</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-primary/10">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">5000+</div>
              <div className="text-sm text-foreground/60 font-mono uppercase tracking-wider">Clients Satisfaits</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
