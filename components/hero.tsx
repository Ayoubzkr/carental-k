"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Award } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

// On garde les images ici car ce n'est pas du texte
const slideImages = [
  "/images/cars/mercedes-class-a-white.jpg",
  "/images/cars/tiguan-black.jpg",
  "/images/cars/porsche-macan-black.jpg",
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const t = useTranslations("hero")
  const tCommon = useTranslations("common")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <motion.img
            src={slideImages[currentSlide]}
            alt="Luxury Car Background"
            className="w-full h-full object-cover"
            animate={{ scale: [1, 1.05] }}
            transition={{ duration: 10, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6 px-4 py-2 border border-primary/30 rounded-full"
          >
            <span className="text-sm font-mono uppercase tracking-wider text-primary">
              {t('badge')}
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h1
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance"
            >
              {t(`slides.${currentSlide}.title`)}{" "}
              <span className="text-primary relative inline-block">
                {t(`slides.${currentSlide}.highlight`)}
                <span className="absolute inset-0 animate-shimmer" />
              </span>{" "}
              {t(`slides.${currentSlide}.subtitle`)}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-2xl mx-auto text-balance leading-relaxed"
            >
              {t(`slides.${currentSlide}.description`)}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
              onClick={() => {
                const message = tCommon('bookNow') + "..."
                const whatsappUrl = `https://wa.me/212665123330?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, "_blank")
              }}
            >
              {t('cta')}
              <ArrowRight className="ml-2 h-5 w-5 rtl:rotate-180" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 bg-transparent"
              onClick={() => {
                const catalogSection = document.getElementById('catalog')
                if (catalogSection) {
                  catalogSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              {t('ctaSecondary')}
            </Button>
          </motion.div>

          <div className="flex justify-center gap-2 mb-8">
            {slideImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-primary w-8" : "bg-primary/30"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/40 transition-colors">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-mono text-sm uppercase tracking-wider mb-2">{t('features.reliable.title')}</h3>
              <p className="text-sm text-foreground/60">{t('features.reliable.desc')}</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/40 transition-colors">
              <Award className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-mono text-sm uppercase tracking-wider mb-2">{t('features.quality.title')}</h3>
              <p className="text-sm text-foreground/60">{t('features.quality.desc')}</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/40 transition-colors">
              <div className="text-3xl mx-auto mb-3">⭐</div>
              <h3 className="font-mono text-sm uppercase tracking-wider mb-2">{t('features.satisfaction.title')}</h3>
              <p className="text-sm text-foreground/60">{t('features.satisfaction.desc')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
