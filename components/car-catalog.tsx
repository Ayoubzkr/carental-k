"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Users, Fuel, Settings, RotateCcw, Car as CarIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// Extended Car Type
type Car = {
  id: number
  name: string
  brand: string
  category: "Citadine" | "Luxe" | "SUV" | "Compacte" | "Berline" | "Sport"
  price: number
  passengers: number
  transmission: "Automatique" | "Manuelle"
  fuel: "Diesel" | "Essence" | "Hybride" | "Electrique"
  featured: boolean
  image: string
  colors: { name: string; hex: string }[]
}

const cars: Car[] = [
  // MERCEDES
  {
    id: 1,
    name: "Mercedes Classe A",
    brand: "Mercedes",
    category: "Luxe",
    price: 450,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/images/cards/classeA-white.png",
    colors: [{ name: "Blanc", hex: "#fff" }, { name: "Noir", hex: "#000" }],
  },
  // VW
  {
    id: 2,
    name: "Volkswagen Tiguan",
    brand: "Volkswagen",
    category: "SUV",
    price: 650,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/images/cards/tiguan-black.png",
    colors: [{ name: "Noir", hex: "#000" }, { name: "Blanc", hex: "#fff" }, { name: "Gris", hex: "#808080" }],
  },
  {
    id: 12,
    name: "Volkswagen Golf 8 GTD",
    brand: "Volkswagen",
    category: "Compacte",
    price: 550,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/images/cards/vw-golf8-gtd-black.png",
    colors: [{ name: "Noir", hex: "#000" }],
  },
  {
    id: 13,
    name: "Volkswagen T-Roc",
    brand: "Volkswagen",
    category: "SUV",
    price: 400,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: false,
    image: "/images/cards/t-roc-white.png",
    colors: [{ name: "Blanc", hex: "#fff" }, { name: "Noir", hex: "#000" }, { name: "Gris", hex: "#808080" }],
  },
  {
    id: 14,
    name: "Volkswagen Touareg",
    brand: "Volkswagen",
    category: "SUV",
    price: 900,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/images/cards/tuareg.jpg",
    colors: [{ name: "Noir", hex: "#000" }],
  },
  // CUPRA
  {
    id: 3,
    name: "Cupra Formentor",
    brand: "Cupra",
    category: "Sport",
    price: 700,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/images/cards/cupra-formentor-bronze.png",
    colors: [{ name: "Bronze", hex: "#cd7f32" }, { name: "Noir", hex: "#000" }, { name: "Gris Mat", hex: "#555" }],
  },
  {
    id: 15,
    name: "Cupra Leon",
    brand: "Cupra",
    category: "Sport",
    price: 600,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    featured: false,
    image: "/images/cards/Cupra-leon-taiga.jpg",
    colors: [{ name: "Taiga", hex: "#8a9a5b" }, { name: "Gris", hex: "#808080" }],
  },
  // PORSCHE
  {
    id: 4,
    name: "Porsche Macan",
    brand: "Porsche",
    category: "Luxe",
    price: 900,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    featured: true,
    image: "/images/cards/porsche-macan-black.png",
    colors: [{ name: "Noir", hex: "#000" }],
  },
  // AUDI
  {
    id: 5,
    name: "Audi A3",
    brand: "Audi",
    category: "Berline",
    price: 500,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: false,
    image: "/images/cards/a3-gris.png",
    colors: [{ name: "Gris", hex: "#808080" }, { name: "Noir", hex: "#000" }],
  },
  {
    id: 30,
    name: "Audi Q3 Sportback",
    brand: "Audi",
    category: "SUV",
    price: 700,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/images/cards/audiQ3-2025.png",
    colors: [{ name: "Gris", hex: "#808080" }],
  },
  // RANGE ROVER
  {
    id: 25,
    name: "Range Rover Evoque",
    brand: "Land Rover",
    category: "SUV",
    price: 800,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/images/cards/evoque-blac.png",
    colors: [{ name: "Noir", hex: "#000" }],
  },
  // PEUGEOT
  {
    id: 6,
    name: "Peugeot 208 GT",
    brand: "Peugeot",
    category: "Citadine",
    price: 350,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/images/cards/peugeot-208 -gt-gris.png",
    colors: [{ name: "Gris", hex: "#808080" }, { name: "Jaune", hex: "#ffd700" }, { name: "Blanc", hex: "#fff" }],
  },
  {
    id: 16,
    name: "Peugeot 2008 GT Line",
    brand: "Peugeot",
    category: "SUV",
    price: 400,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: false,
    image: "/images/cards/peugeot2008gtlie2025-gris.jpg",
    colors: [{ name: "Gris", hex: "#808080" }],
  },
  {
    id: 17,
    name: "Peugeot 308 GT",
    brand: "Peugeot",
    category: "Compacte",
    price: 450,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: false,
    image: "/images/cards/peugeot-308GTline-black.png",
    colors: [{ name: "Noir", hex: "#000" }],
  },
  // RENAULT
  {
    id: 7,
    name: "Renault Clio 5",
    brand: "Renault",
    category: "Citadine",
    price: 300,
    passengers: 5,
    transmission: "Manuelle",
    fuel: "Diesel",
    featured: false,
    image: "/images/cards/clio5-2023-gris.png",
    colors: [{ name: "Gris", hex: "#808080" }, { name: "Blanc", hex: "#fff" }, { name: "Noir", hex: "#000" }],
  },
  {
    id: 18,
    name: "Renault Clio 5 Alpine",
    brand: "Renault",
    category: "Citadine",
    price: 350,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    featured: true,
    image: "/images/cards/clio5-espri-alpine.png",
    colors: [{ name: "Bleu", hex: "#0000ff" }],
  },
  // DACIA
  {
    id: 8,
    name: "Dacia Duster",
    brand: "Dacia",
    category: "SUV",
    price: 350,
    passengers: 5,
    transmission: "Manuelle",
    fuel: "Diesel",
    featured: false,
    image: "/images/cards/dacia-duster-gris.png",
    colors: [{ name: "Gris", hex: "#808080" }],
  },
  {
    id: 9,
    name: "Dacia Sandero Stepway",
    brand: "Dacia",
    category: "Citadine",
    price: 300,
    passengers: 5,
    transmission: "Manuelle",
    fuel: "Diesel",
    featured: true,
    image: "/images/cards/Dacia-sandero-STEPWAY-gris.png",
    colors: [{ name: "Gris", hex: "#808080" }, { name: "Vert", hex: "#006400" }],
  },
  // SEAT
  {
    id: 10,
    name: "Seat Ibiza",
    brand: "Seat",
    category: "Citadine",
    price: 300,
    passengers: 5,
    transmission: "Manuelle",
    fuel: "Diesel",
    featured: false,
    image: "/images/cards/seat-ibiza-black-universary.png",
    colors: [{ name: "Noir", hex: "#000" }, { name: "Blanc", hex: "#fff" }],
  },
  {
    id: 11,
    name: "Seat Ateca",
    brand: "Seat",
    category: "SUV",
    price: 450,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: false,
    image: "/images/cards/seat-ateca-gris.png",
    colors: [{ name: "Gris", hex: "#808080" }, { name: "Blanc", hex: "#fff" }],
  },
  {
    id: 19,
    name: "Seat Arona",
    brand: "Seat",
    category: "SUV",
    price: 350,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: false,
    image: "/images/cards/arona-black.png",
    colors: [{ name: "Noir", hex: "#000" }],
  },
  // FIAT
  {
    id: 20,
    name: "Fiat 500",
    brand: "Fiat",
    category: "Citadine",
    price: 250,
    passengers: 4,
    transmission: "Manuelle",
    fuel: "Essence",
    featured: false,
    image: "/images/cards/fiat500-white.png",
    colors: [{ name: "Blanc", hex: "#fff" }],
  },
  {
    id: 21,
    name: "Fiat 500X",
    brand: "Fiat",
    category: "SUV",
    price: 350,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: false,
    image: "/images/cards/fiat500x-bleu.jpg",
    colors: [{ name: "Bleu", hex: "#0000ff" }],
  },
  // HYUNDAI
  {
    id: 22,
    name: "Hyundai Tucson N-Line",
    brand: "Hyundai",
    category: "SUV",
    price: 600,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/images/cards/Tucson-nline-gris.png",
    colors: [{ name: "Gris", hex: "#808080" }],
  },
  {
    id: 31,
    name: "Hyundai i20",
    brand: "Hyundai",
    category: "Citadine",
    price: 300,
    passengers: 5,
    transmission: "Manuelle",
    fuel: "Diesel",
    featured: false,
    image: "/images/cards/hyondaii20-2025.png",
    colors: [{ name: "Gris", hex: "#808080" }],
  },
]

function CarCard({ car }: { car: Car }) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/vehicule/${car.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card
        onClick={handleCardClick}
        className="h-full bg-[#121212] border-white/5 overflow-hidden group hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] cursor-pointer flex flex-col"
      >
        <div className="relative h-64 overflow-hidden bg-white flex items-center justify-center">
          <motion.img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-contain z-10 relative"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          {car.featured && (
            <Badge className="absolute top-4 right-4 bg-[#D4AF37] text-black hover:bg-[#b0912d] font-semibold tracking-wide border-none z-20">
              Recommandé
            </Badge>
          )}
        </div>

        <CardContent className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <h3 className="text-2xl font-playfair font-bold text-[#f5f5f5] mb-1">{car.name}</h3>
            <p className="text-xs text-white/40 uppercase tracking-widest">{car.category}</p>
          </div>

          <div className="flex gap-2 mb-6">
            {car.colors.map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border border-white/20"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#D4AF37]" /> {car.passengers} places
            </div>
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-[#D4AF37]" /> {car.transmission}
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="h-4 w-4 text-[#D4AF37]" /> {car.fuel}
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10 flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-[#D4AF37] leading-none mb-1">{car.price} <span className="text-sm font-normal text-[#D4AF37]/70">MAD</span></div>
              <div className="text-[10px] text-white/40 uppercase font-mono">/ Jour</div>
            </div>
            <Button
              className="bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-colors rounded-none px-6"
            >
              Voir détails
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function CarCatalog() {
  const [filters, setFilters] = useState({
    brand: "all",
    category: "all",
    fuel: "all",
    transmission: "all"
  })

  // Extract unique brands and categories for dropdowns
  const brands = Array.from(new Set(cars.map(c => c.brand))).sort()
  const categories = Array.from(new Set(cars.map(c => c.category))).sort()

  const filteredCars = cars.filter(car => {
    return (
      (filters.brand === "all" || car.brand === filters.brand) &&
      (filters.category === "all" || car.category === filters.category) &&
      (filters.fuel === "all" || car.fuel === filters.fuel) &&
      (filters.transmission === "all" || car.transmission === filters.transmission)
    )
  })

  return (
    <section id="catalog" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block mb-6 px-6 py-2 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5 backdrop-blur-sm">
            <span className="text-sm font-mono uppercase tracking-[0.2em] text-[#D4AF37]">Notre Flotte</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-white leading-tight">
            Collection Exclusive <br />
            <span className="text-[#D4AF37] italic">de Véhicules de Luxe</span>
          </h2>

          <p className="text-xl text-white/60 text-balance font-light">
            Choisissez parmi notre sélection de véhicules premium, chacun maintenu aux plus hauts standards
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-[#111] border border-white/5 rounded-2xl p-4 mb-16 shadow-2xl overflow-x-auto">
          <div className="flex flex-col md:flex-row items-center gap-4 min-w-max md:min-w-0">

            {/* Brand Select */}
            <Select onValueChange={(v) => setFilters(prev => ({ ...prev, brand: v }))}>
              <SelectTrigger className="w-[180px] bg-black/50 border-white/10 text-white focus:ring-[#D4AF37]">
                <SelectValue placeholder="Marque" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-white/10 text-white">
                <SelectItem value="all">Toutes les marques</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category Select */}
            <Select onValueChange={(v) => setFilters(prev => ({ ...prev, category: v }))}>
              <SelectTrigger className="w-[180px] bg-black/50 border-white/10 text-white focus:ring-[#D4AF37]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-white/10 text-white">
                <SelectItem value="all">Toutes catégories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Transmission Select */}
            <Select onValueChange={(v) => setFilters(prev => ({ ...prev, transmission: v }))}>
              <SelectTrigger className="w-[180px] bg-black/50 border-white/10 text-white focus:ring-[#D4AF37]">
                <SelectValue placeholder="Transmission" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-white/10 text-white">
                <SelectItem value="all">Transmission</SelectItem>
                <SelectItem value="Automatique">Automatique</SelectItem>
                <SelectItem value="Manuelle">Manuelle</SelectItem>
              </SelectContent>
            </Select>

            <div className="h-8 w-px bg-white/10 hidden md:block mx-2" />

            {/* Quick Fuel Toggles */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, fuel: prev.fuel === "Diesel" ? "all" : "Diesel" }))}
                className={cn(
                  "border-white/10 text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37]",
                  filters.fuel === "Diesel" && "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]"
                )}
              >
                Diesel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, fuel: prev.fuel === "Essence" ? "all" : "Essence" }))}
                className={cn(
                  "border-white/10 text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37]",
                  filters.fuel === "Essence" && "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]"
                )}
              >
                Essence
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, fuel: prev.fuel === "Hybride" ? "all" : "Hybride" }))}
                className={cn(
                  "border-white/10 text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37]",
                  filters.fuel === "Hybride" && "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]"
                )}
              >
                Hybride
              </Button>
            </div>

            <div className="ml-auto">
              <Button
                onClick={() => setFilters({ brand: "all", category: "all", fuel: "all", transmission: "all" })}
                variant="ghost"
                className="text-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Réinitialiser
              </Button>
            </div>

          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <CarIcon className="h-16 w-16 text-white/10 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Aucun véhicule trouvé</h3>
                <p className="text-white/50">Essayez de modifier vos filtres pour voir plus de rèsultats.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
