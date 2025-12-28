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
        "Choisissez parmi notre flotte exclusive de véhicules premium. Parfait pour les voyages d'affaires, les occasions spéciales, ou simplement pour vivre l'expérience du luxe.",
      features: [
        "Large sélection de voitures de luxe",
        "Périodes de location flexibles",
        "Assurance complète",
        "Livraison et récupération gratuites",
      ],
      image: "/luxury-car-dashboard.jpeg",
    },
    {
      id: "wash",
      icon: Sparkles,
      title: "Lavage Automobile Professionnel",
      description:
        "Services de nettoyage et de detailing experts qui maintiennent votre véhicule comme neuf. Utilisant des produits et techniques premium.",
      features: [
        "Detailing intérieur et extérieur",
        "Protection de peinture",
        "Produits de nettoyage premium",
        "Délai de traitement rapide",
      ],
      image: "/professional-car-wash-luxury-vehicle-being-cleaned.jpeg",
    },
  ]

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-2 border border-primary/30 rounded-full">
            <span className="text-xs font-mono uppercase tracking-wider text-primary">Nos Services</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Services Premium Adaptés Pour Vous</h2>

          <p className="text-lg text-foreground/70 text-balance">
            Découvrez le mélange parfait de luxe et de professionnalisme avec nos services automobiles complets
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

                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">En Savoir Plus</Button>
                  </CardContent>
                </Card>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="relative h-[400px] rounded-lg overflow-hidden border border-primary/20">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
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
              <div className="text-sm text-foreground/60 font-mono uppercase tracking-wider">Assuré</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-primary/10">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-foreground/60 font-mono uppercase tracking-wider">Support</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-primary/10">
            <CardContent className="p-6 text-center">
              <Car className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-foreground/60 font-mono uppercase tracking-wider">Véhicules</div>
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
