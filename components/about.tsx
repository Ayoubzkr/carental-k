import { CheckCircle } from "lucide-react"

export function About() {
  const features = [
    "Plus de 10 ans d’expertise au service du luxe",
    "Flotte haut de gamme soigneusement sélectionnée",
    "Services de lavage et detailing premium",
    "Excellence du service et satisfaction client",
    "Support et assistance dédiés 24/7",
  ]

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-2 border border-primary/30 rounded-full">
              <span className="text-xs font-mono uppercase tracking-wider text-primary">À Propos de K-Rim Car</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">L’Art du Luxe, Maîtrisé à la Perfection</h2>

            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              K-Rim Car est votre référence dans la location de voitures haut de gamme et les services de detailing professionnel. Nous mettons à votre disposition une expertise affirmée et une véritable culture de l’excellence pour offrir des prestations d’un niveau supérieur.
            </p>

            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Notre engagement pour la qualité, le souci du détail et l’écoute du client a fait de K-Rim Car un partenaire de confiance pour une clientèle exigeante, à la recherche d’un service réellement irréprochable.
            </p>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[500px] rounded-lg overflow-hidden border border-primary/20">
              <video
                src="/K-RIM.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            {/* Accent Border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/30 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
