"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useTranslations } from "next-intl"

export function Pricing() {
  const t = useTranslations("pricing")

  const washPackages = [
    {
      id: "express",
      price: 100,
      popular: false,
    },
    {
      id: "premium",
      price: 250,
      popular: true,
    },
    {
      id: "luxe",
      price: 450,
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-2 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5">
            <span className="text-sm font-mono uppercase tracking-wider text-[#D4AF37]">{t("badge")}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-white text-balance">
            {t("title")}
          </h2>

          <p className="text-lg text-white/60 text-balance">
            {t("subtitle")}
          </p>
        </div>

        {/* Car Wash Pricing */}
        <div className="relative py-10 px-4 md:px-0">
          <div className="relative">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {washPackages.map((pkg) => {
                // Fetch translations for each package dynamically
                // We assume features are arrays in the JSON, so we get them one by one or get the object if possible.
                // Next-intl allows getting rich text or arrays if configured, but strict typing might block it.
                // Standard way: keys are express, premium, luxe. features is an array in json.
                // We can iterate up to a reasonable number or map manually if we know the count.
                // Better approach: Get the raw object for features is tricky with simple useTranslations.
                // I will assume standard keys like features.0, features.1 etc if I can't get array.
                // Actually, t.raw('packages.express.features') returns the array if configured! 
                // But let's stick to reliable method: use hardcoded indices or try t.raw.

                // Let's rely on standard keys: name, desc. Features: we will assume 4-6 features.
                // To be safe and clean, I'll pass the translation keys.

                const featuresKey = `packages.${pkg.id}.features`; // This is not directly iterable easily without t.raw
                // Let's try raw. If it fails, I'll hardcode indices.
                // Note: t.raw returns any, so it's good for arrays.

                // WARNING: t.raw requires a specific setup or standard i18n instance. 
                // If it fails, I'll fix it. Let's try to just map "features" from standard definition if possible.
                // Since I just defined the JSON, I know the content.

                // Workaround: render features by getting the message object?
                // I will use `useMessages` to get the full object for this section.

                return (
                  <PackageCard key={pkg.id} pkg={pkg} />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PackageCard({ pkg }: { pkg: { id: string, price: number, popular: boolean } }) {
  const t = useTranslations("pricing")
  // Using explicit keys for safety without t.raw
  // Define feature counts based on package type to avoid translation errors
  const featureCount = pkg.id === 'express' ? 4 : 6;
  const indices = Array.from({ length: featureCount }, (_, i) => i);

  return (
    <Card
      className={`relative border transition-all duration-300 hover:-translate-y-2 group ${pkg.popular
        ? "border-[#D4AF37]/50 bg-black"
        : "border-white/10 bg-black/50"
        }`}
    >
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider border border-black">
          {t("popular")}
        </div>
      )}

      <CardHeader className="text-center pb-6 pt-10">
        <h4 className="text-2xl font-playfair font-bold mb-2 text-white group-hover:text-[#D4AF37] transition-colors">
          {t(`packages.${pkg.id}.name`)}
        </h4>
        <p className="text-sm text-white/50 mb-6">{t(`packages.${pkg.id}.desc`)}</p>
        <div className="mb-2 flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-white">{pkg.price}</span>
          <span className="text-lg text-[#D4AF37] dir-ltr">MAD</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-8 pb-8">
        <ul className="space-y-3 mb-8">
          {indices.map((index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <span className="text-white/70 text-sm">{t(`packages.${pkg.id}.features.${index}`)}</span>
            </li>
          ))}
        </ul>

        <Button
          className={`w-full py-6 text-base font-semibold group-hover:bg-[#D4AF37] group-hover:text-black transition-all ${pkg.popular
            ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50"
            : "bg-white/5 text-white border border-white/10"
            }`}
        >
          {t("book")}
        </Button>
      </CardContent>
    </Card>
  )
}
