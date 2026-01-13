"use client"

import { CheckCircle } from "lucide-react"
import { useTranslations } from "next-intl"

export function About() {
  const t = useTranslations("about")

  const features = [
    t("features.exp"),
    t("features.fleet"),
    t("features.wash"),
    t("features.service"),
    t("features.support"),
  ]

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-2 border border-primary/30 rounded-full">
              <span className="text-xs font-mono uppercase tracking-wider text-primary">{t("badge")}</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t("title")}</h2>

            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              {t("description1")}
            </p>

            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              {t("description2")}
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
