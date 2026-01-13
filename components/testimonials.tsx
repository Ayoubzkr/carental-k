"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

const testimonialsData = [
  {
    id: 1,
    name: "Hicham El Alaoui",
    rating: 5,
    dateKey: "2j", // We'll keep dynamic date handling simple or hardcoded for now
    date: "Il y a 2 jours"
  },
  {
    id: 2,
    name: "Sofia Benjelloun",
    rating: 5,
    dateKey: "1w",
    date: "Il y a 1 semaine"
  },
  {
    id: 3,
    name: "Omar Berrada",
    rating: 5,
    dateKey: "2w",
    date: "Il y a 2 semaines"
  },
  {
    id: 4,
    name: "Leila Chraibi",
    rating: 5,
    dateKey: "3w",
    date: "Il y a 3 semaines"
  },
  {
    id: 5,
    name: "Yassine Amrani",
    rating: 5,
    dateKey: "1m",
    date: "Il y a 1 mois"
  }
]

export function Testimonials() {
  const t = useTranslations("testimonials")

  // Reconstruct the array with translated text
  const testimonials = testimonialsData.map((item, index) => ({
    ...item,
    text: t(`reviews.${index}.text`)
  }))

  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  // Adjust items per page based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [currentIndex, itemsPerPage])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const getVisibleTestimonials = () => {
    const items = []
    for (let i = 0; i < itemsPerPage; i++) {
      const index = (currentIndex + i) % testimonials.length
      items.push({ ...testimonials[index], keyId: `${testimonials[index].id}-${currentIndex}-${i}` })
    }
    return items
  }

  const GoogleLogo = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6 mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4" />
      <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853" />
      <path d="M5.50253 14.3003C5.00236 12.8099 5.00236 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC04" />
      <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.0344664 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335" />
    </svg>
  )

  return (
    <section id="testimonials" className="py-24 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header with Google Rating */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
            <GoogleLogo />
            <span className="text-white font-bold text-lg">4.9</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="h-4 w-4 fill-[#FBBC04] text-[#FBBC04]" />
              ))}
            </div>
            <span className="text-white/60 text-sm ml-2 border-l border-white/20 pl-3">
              {t("googleRating")}
            </span>
          </div>

          <p className="text-white/40 text-xs mt-2 mb-8">
            {t("verified")}
          </p>

          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-white text-balance">
            {t("title")}
          </h2>

          <p className="text-white/50 max-w-2xl mx-auto mt-4">
            {t("subtitle")}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-12 z-20">
            <Button variant="ghost" size="icon" onClick={prevSlide} className="text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full h-12 w-12 dir-ltr">
              <ChevronLeft className="h-8 w-8 rtl:rotate-180" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-12 z-20">
            <Button variant="ghost" size="icon" onClick={nextSlide} className="text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full h-12 w-12 dir-ltr">
              <ChevronRight className="h-8 w-8 rtl:rotate-180" />
            </Button>
          </div>

          <div className="flex gap-6 overflow-hidden py-4">
            <AnimatePresence mode="popLayout" initial={false} custom={currentIndex}>
              {getVisibleTestimonials().map((testimonial) => (
                <motion.div
                  key={testimonial.keyId}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0"
                >
                  <Card className="h-full bg-[#111] border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
                          ))}
                        </div>
                        <Quote className="h-6 w-6 text-[#D4AF37]/20" />
                      </div>

                      <p className="text-white/80 mb-6 leading-relaxed flex-grow font-light">
                        "{testimonial.text}"
                      </p>

                      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{testimonial.name}</div>
                          <div className="text-xs text-white/40">{testimonial.date}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="https://wa.me/212665123330"
            target="_blank"
            className="inline-block bg-[#D4AF37] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#b0912d] transition-all"
          >
            {t("cta")}
          </a>
        </div>

      </div>
    </section>
  )
}
