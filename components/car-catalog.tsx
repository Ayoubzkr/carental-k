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
  category: "Citadine" | "Luxe" | "SUV" | "Compacte" | "Berline" | "Sport" | "Utilitaire"
  basePrice: number
  passengers: number
  transmission: "Automatique" | "Manuelle"
  fuel: "Diesel" | "Essence" | "Hybride" | "Electrique"
  featured: boolean
  image: string
  galleryFolder?: string
  colors: { name: string; hex: string; image: string }[]
  year: number
  shortDescription: string
  slug: string
}

const cars: Car[] = [
  // MERCEDES
  {
    id: 1,
    name: "Mercedes Classe A",
    brand: "Mercedes",
    category: "Luxe",
    basePrice: 450,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/voitures/mercedes-classe-a/mercedes-classe-a-location-tanger.png",
    galleryFolder: "/voitures/mercedes-classe-a",
    colors: [
      { name: "Blanc", hex: "#fff", image: "/voitures/mercedes-classe-a/mercedes-classe-a-location-tanger.png" },
      { name: "Noir", hex: "#000", image: "/voitures/mercedes-classe-a/mercedes-classe-a-location-tanger.png" }
    ],
    year: 2023,
    shortDescription: "Compacte, luxueuse et technologique.",
    slug: "mercedes-classe-a"
  },
  // VW
  {
    id: 2,
    name: "Volkswagen Tiguan",
    brand: "Volkswagen",
    category: "SUV",
    basePrice: 650,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/voitures/vw-tiguan/tiguan-black.png",
    galleryFolder: "/voitures/vw-tiguan",
    colors: [{ name: "Noir", hex: "#000", image: "/voitures/vw-tiguan/tiguan-black.png" }],
    year: 2022,
    shortDescription: "Le SUV polyvalent par excellence.",
    slug: "volkswagen-tiguan"
  },
  {
    id: 12,
    name: "Volkswagen Golf 8 GTD",
    brand: "Volkswagen",
    category: "Compacte",
    basePrice: 1500,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/voitures/vw-8gtd/vw-golf8-gtd-black.png",
    galleryFolder: "/voitures/vw-8gtd",
    colors: [{ name: "Noir", hex: "#000", image: "/voitures/vw-8gtd/vw-golf8-gtd-black.png" }],
    year: 2024,
    shortDescription: "Performance et économie.",
    slug: "volkswagen-golf-8-gtd"
  },
  {
    id: 13,
    name: "Volkswagen T-Roc",
    brand: "Volkswagen",
    category: "SUV",
    basePrice: 700,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: false,
    image: "/voitures/vw-troc/t-roc-white.png",
    galleryFolder: "/voitures/vw-troc",
    colors: [{ name: "Blanc", hex: "#fff", image: "/voitures/vw-troc/t-roc-white.png" }],
    year: 2025,
    shortDescription: "Design audacieux et polyvalence.",
    slug: "volkswagen-t-roc"
  },
  {
    id: 14,
    name: "Volkswagen Touareg",
    brand: "Volkswagen",
    category: "SUV",
    basePrice: 1500,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/voitures/vw-tuareg/tuareg.jpg",
    galleryFolder: "/voitures/vw-tuareg",
    colors: [{ name: "Noir", hex: "#000", image: "/voitures/vw-tuareg/tuareg.jpg" }],
    year: 2024,
    shortDescription: "Le summum du luxe chez Volkswagen.",
    slug: "volkswagen-touareg"
  },
  {
    id: 40,
    name: "Volkswagen Golf 8.5 R",
    brand: "Volkswagen",
    category: "Compacte",
    basePrice: 1000,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/voitures/vw-8.5r/golf-8.5r-gris.png",
    galleryFolder: "/voitures/vw-8.5r",
    colors: [{ name: "Gris", hex: "#808080", image: "/voitures/vw-8.5r/golf-8.5r-gris.png" }],
    year: 2025,
    shortDescription: "L'ultime compacte sportive.",
    slug: "volkswagen-golf-8-5-r"
  },
  {
    id: 46,
    name: "Volkswagen T-Cross R",
    brand: "Volkswagen",
    category: "SUV",
    basePrice: 500,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    featured: true,
    image: "/voitures/vw-tcrossR/t-cross-bleuclaire.png",
    galleryFolder: "/voitures/vw-tcrossR",
    colors: [{ name: "Bleu Clair", hex: "#add8e6", image: "/voitures/vw-tcrossR/t-cross-bleuclaire.png" }],
    year: 2025,
    shortDescription: "SUV compact au caractère sportif.",
    slug: "volkswagen-t-cross-r"
  },
  // CUPRA
  {
    id: 3,
    name: "Cupra Formentor",
    brand: "Cupra",
    category: "Sport",
    basePrice: 700,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/voitures/cupra-formentor/cupra-formentor-bronze.png",
    galleryFolder: "/voitures/cupra-formentor",
    colors: [{ name: "Bronze", hex: "#cd7f32", image: "/voitures/cupra-formentor/cupra-formentor-bronze.png" }],
    year: 2024,
    shortDescription: "SUV Coupé alliant style et performance.",
    slug: "cupra-formentor"
  },
  {
    id: 15,
    name: "Cupra Leon",
    brand: "Cupra",
    category: "Sport",
    basePrice: 600,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    featured: false,
    image: "/voitures/cupra-leon/Cupra-leon-taiga.jpg",
    galleryFolder: "/voitures/cupra-leon",
    colors: [{ name: "Taiga", hex: "#8a9a5b", image: "/voitures/cupra-leon/Cupra-leon-taiga.jpg" }],
    year: 2024,
    shortDescription: "La compacte sportive par excellence.",
    slug: "cupra-leon"
  },
  // PORSCHE
  {
    id: 4,
    name: "Porsche Macan",
    brand: "Porsche",
    category: "Luxe",
    basePrice: 2500,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    featured: true,
    image: "/voitures/porsche-macan/porsche-macan-black.png",
    galleryFolder: "/voitures/porsche-macan",
    colors: [{ name: "Noir", hex: "#000", image: "/voitures/porsche-macan/porsche-macan-black.png" }],
    year: 2023,
    shortDescription: "L'intensité de la vie.",
    slug: "porsche-macan"
  },
  // AUDI
  {
    id: 5,
    name: "Audi A3",
    brand: "Audi",
    category: "Berline",
    basePrice: 500,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: false,
    image: "/voitures/audi-a3/a3-gris.png",
    galleryFolder: "/voitures/audi-a3",
    colors: [{ name: "Gris", hex: "#808080", image: "/voitures/audi-a3/a3-gris.png" }],
    year: 2023,
    shortDescription: "Élégance et technologie compacte.",
    slug: "audi-a3"
  },
  {
    id: 30,
    name: "Audi Q3 Sportback",
    brand: "Audi",
    category: "SUV",
    basePrice: 700,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/voitures/audi-q3/audiQ3-2025.png",
    galleryFolder: "/voitures/audi-q3",
    colors: [{ name: "Gris", hex: "#808080", image: "/voitures/audi-q3/audiQ3-2025.png" }],
    year: 2025,
    shortDescription: "Le SUV coupé dynamique.",
    slug: "audi-q3-sportback"
  },
  // RANGE ROVER
  {
    id: 25,
    name: "Range Rover Evoque",
    brand: "Land Rover",
    category: "SUV",
    basePrice: 800,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: true,
    image: "/voitures/range-evoque/evoque-blac.png",
    galleryFolder: "/voitures/range-evoque",
    colors: [{ name: "Noir", hex: "#000", image: "/voitures/range-evoque/evoque-blac.png" }],
    year: 2024,
    shortDescription: "Style minimaliste et raffiné.",
    slug: "range-rover-evoque"
  },
  // YAMAHA
  {
    id: 41,
    name: "Yamaha XMAX",
    brand: "Yamaha",
    category: "Sport",
    basePrice: 400,
    passengers: 2,
    transmission: "Automatique",
    fuel: "Essence",
    featured: false,
    image: "/voitures/yamaha-xmax/yamaha-x-max.png",
    galleryFolder: "/voitures/yamaha-xmax",
    colors: [{ name: "Noir", hex: "#000", image: "/voitures/yamaha-xmax/yamaha-x-max.png" }],
    year: 2024,
    shortDescription: "Scooter sportif pour la ville.",
    slug: "yamaha-xmax"
  },
  // PEUGEOT
  {
    id: 6,
    name: "Peugeot 208",
    brand: "Peugeot",
    category: "Citadine",
    basePrice: 300,
    passengers: 5,
    transmission: "Manuelle",
    fuel: "Diesel",
    featured: true,
    image: "/voitures/peugeot-208/peugeot208-2023-gris.png",
    galleryFolder: "/voitures/peugeot-208",
    colors: [{ name: "Gris", hex: "#808080", image: "/voitures/peugeot-208/peugeot208-2023-gris.png" }],
    year: 2023,
    shortDescription: "Citadine au look irrésistible.",
    slug: "peugeot-208"
  },
  {
    id: 42,
    name: "Peugeot 208 NV",
    brand: "Peugeot",
    category: "Citadine",
    basePrice: 350,
    passengers: 5,
    transmission: "Manuelle",
    fuel: "Diesel",
    featured: true,
    image: "/voitures/peugeot-208-nv/Peugeot-208-style-black.png",
    galleryFolder: "/voitures/peugeot-208-nv",
    colors: [{ name: "Noir", hex: "#000", image: "/voitures/peugeot-208-nv/Peugeot-208-style-black.png" }],
    year: 2025,
    shortDescription: "Nouvelle version avec encore plus de style.",
    slug: "peugeot-208-nv"
  },
  {
    id: 16,
    name: "Peugeot 2008 GT Line",
    brand: "Peugeot",
    category: "SUV",
    basePrice: 400,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    featured: false,
    image: "/voitures/peugeot-2008/peugeot2008gtlie2025-gris.jpg",
    galleryFolder: "/voitures/peugeot-2008",
    colors: [{ name: "Gris", hex: "#808080", image: "/voitures/peugeot-2008/peugeot2008gtlie2025-gris.jpg" }],
    year: 2025,
    shortDescription: "SUV compact et technologique.",
    slug: "peugeot-2008-gt-line"
  },
  {
    id: 17,
    name: "Peugeot 308 GT Line",
    brand: "Peugeot",
    category: "Compacte",
    basePrice: 800,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: false,
    image: "/voitures/peugeot-308/peugeot-308GTline-black.png",
    galleryFolder: "/voitures/peugeot-308",
    colors: [{ name: "Noir", hex: "#000", image: "/voitures/peugeot-308/peugeot-308GTline-black.png" }],
    year: 2025,
    shortDescription: "Berline audacieuse et haut de gamme.",
    slug: "peugeot-308-gt-line"
  },
  // RENAULT
  {
    id: 7,
    name: "Renault Clio 5",
    brand: "Renault",
    category: "Citadine",
    basePrice: 300,
    passengers: 5,
    transmission: "Manuelle",
    fuel: "Diesel",
    featured: false,
    image: "/voitures/renault-clio5/clio5-2023-gris.png",
    galleryFolder: "/voitures/renault-clio5",
    colors: [{ name: "Gris", hex: "#808080", image: "/voitures/renault-clio5/clio5-2023-gris.png" }],
    year: 2024,
    shortDescription: "L'icône des citadines.",
    slug: "renault-clio-5"
  },
  {
    id: 18,
    name: "Renault Clio 5 NV",
    brand: "Renault",
    category: "Citadine",
    basePrice: 400,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    featured: true,
    image: "/voitures/renault-clio5-nv/renault-clio5-white.png",
    galleryFolder: "/voitures/renault-clio5-nv",
    colors: [{ name: "Blanc", hex: "#fff", image: "/voitures/renault-clio5-nv/renault-clio5-white.png" }],
    year: 2025,
    shortDescription: "Nouvelle Clio, encore plus séduisante.",
    slug: "renault-clio-5-nv"
  },
  {
    id: 43,
    name: "Renault Express",
    brand: "Renault",
    category: "Utilitaire",
    basePrice: 400,
    passengers: 5,
    transmission: "Manuelle",
    fuel: "Diesel",
    featured: false,
    image: "/voitures/renault-express/renault-express-black.png",
    galleryFolder: "/voitures/renault-express",
    colors: [{ name: "Noir", hex: "#000", image: "/voitures/renault-express/renault-express-black.png" }],
    year: 2023,
    shortDescription: "Combispace pratique et spacieux.",
    slug: "renault-express"
  },
  // DACIA
  {
    id: 8,
    name: "Dacia Duster",
    brand: "Dacia",
    category: "SUV",
    basePrice: 350,
    passengers: 5,
    transmission: "Manuelle",
    fuel: "Diesel",
    featured: false,
    image: "/voitures/dacia-duster/dacia-duster-gris.png",
    galleryFolder: "/voitures/dacia-duster",
    colors: [{ name: "Gris", hex: "#808080", image: "/voitures/dacia-duster/dacia-duster-gris.png" }],
    year: 2024,
    shortDescription: "SUV familial au meilleur prix.",
    slug: "dacia-duster"
  },
  {
    id: 9,
    name: "Dacia Sandero Stepway",
    brand: "Dacia",
    category: "Citadine",
    basePrice: 350,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    featured: true,
    image: "/voitures/dacia-sandero-stepway/Dacia-sandero-STEPWAY-gris.png",
    galleryFolder: "/voitures/dacia-sandero-stepway",
    colors: [{ name: "Gris", hex: "#808080", image: "/voitures/dacia-sandero-stepway/Dacia-sandero-STEPWAY-gris.png" }],
    year: 2025,
    shortDescription: "Citadine aventurière et robuste.",
    slug: "dacia-sandero-stepway"
  },
  {
    id: 44,
    name: "Dacia Sandero",
    brand: "Dacia",
    category: "Citadine",
    basePrice: 300,
    passengers: 5,
    transmission: "Manuelle",
    fuel: "Diesel",
    featured: false,
    image: "/voitures/dacia-sandero/dacia-sandero-white.png",
    galleryFolder: "/voitures/dacia-sandero",
    colors: [{ name: "Blanc", hex: "#fff", image: "/voitures/dacia-sandero/dacia-sandero-white.png" }],
    year: 2024,
    shortDescription: "L'essentiel au meilleur prix.",
    slug: "dacia-sandero"
  },
  // SEAT
  {
    id: 10,
    name: "Seat Ibiza",
    brand: "Seat",
    category: "Citadine",
    basePrice: 350,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    featured: false,
    image: "/voitures/seat-ibiza-nv/seat-ibiza-black-universary.png",
    galleryFolder: "/voitures/seat-ibiza-nv",
    colors: [{ name: "Noir", hex: "#000", image: "/voitures/seat-ibiza-nv/seat-ibiza-black-universary.png" }],
    year: 2024,
    shortDescription: "Citadine espagnole pleine de tempérament.",
    slug: "seat-ibiza"
  },
  {
    id: 11,
    name: "Seat Ateca",
    brand: "Seat",
    category: "SUV",
    basePrice: 700,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: false,
    image: "/voitures/seat-ateca/seat-ateca-gris.png",
    galleryFolder: "/voitures/seat-ateca",
    colors: [{ name: "Gris", hex: "#808080", image: "/voitures/seat-ateca/seat-ateca-gris.png" }],
    year: 2025,
    shortDescription: "SUV dynamique et spacieux.",
    slug: "seat-ateca"
  },
  {
    id: 19,
    name: "Seat Arona",
    brand: "Seat",
    category: "SUV",
    basePrice: 350,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: false,
    image: "/voitures/seat-arona/arona-black.png",
    galleryFolder: "/voitures/seat-arona",
    colors: [{ name: "Noir", hex: "#000", image: "/voitures/seat-arona/arona-black.png" }],
    year: 2023,
    shortDescription: "Crossover urbain agile.",
    slug: "seat-arona"
  },
  // FIAT
  {
    id: 20,
    name: "Fiat 500",
    brand: "Fiat",
    category: "Citadine",
    basePrice: 400,
    passengers: 4,
    transmission: "Automatique",
    fuel: "Essence",
    featured: false,
    image: "/voitures/fiat-500/fiat500-white.png",
    galleryFolder: "/voitures/fiat-500",
    colors: [{ name: "Blanc", hex: "#fff", image: "/voitures/fiat-500/fiat500-white.png" }],
    year: 2023,
    shortDescription: "La dolce vita en format compact.",
    slug: "fiat-500"
  },
  {
    id: 21,
    name: "Fiat 500X",
    brand: "Fiat",
    category: "SUV",
    basePrice: 400,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    featured: false,
    image: "/voitures/fiat-500x/fiat500x-bleu.jpg",
    galleryFolder: "/voitures/fiat-500x",
    colors: [{ name: "Bleu", hex: "#0000ff", image: "/voitures/fiat-500x/fiat500x-bleu.jpg" }],
    year: 2023,
    shortDescription: "Le style 500 en version SUV.",
    slug: "fiat-500x"
  },
  {
    id: 45,
    name: "Fiat Tipo",
    brand: "Fiat",
    category: "Berline",
    basePrice: 300,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    featured: false,
    image: "/voitures/fiat-tipo/FiatTipo-gris.png",
    galleryFolder: "/voitures/fiat-tipo",
    colors: [{ name: "Gris", hex: "#808080", image: "/voitures/fiat-tipo/FiatTipo-gris.png" }],
    year: 2023,
    shortDescription: "Berline familiale rationnelle.",
    slug: "fiat-tipo"
  },
  // HYUNDAI
  {
    id: 22,
    name: "Hyundai Tucson N-Line",
    brand: "Hyundai",
    category: "SUV",
    basePrice: 500,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    featured: true,
    image: "/voitures/hyundai-tucson-nline/Tucson-nline-gris.png",
    galleryFolder: "/voitures/hyundai-tucson-nline",
    colors: [{ name: "Gris", hex: "#808080", image: "/voitures/hyundai-tucson-nline/Tucson-nline-gris.png" }],
    year: 2024,
    shortDescription: "Le Tucson au look sportif N-Line.",
    slug: "hyundai-tucson-n-line"
  },
  {
    id: 31,
    name: "Hyundai i20",
    brand: "Hyundai",
    category: "Citadine",
    basePrice: 400,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    featured: false,
    image: "/voitures/hyundai-i20/hyondaii20-2025.png",
    galleryFolder: "/voitures/hyundai-i20",
    colors: [{ name: "Gris", hex: "#808080", image: "/voitures/hyundai-i20/hyondaii20-2025.png" }],
    year: 2025,
    shortDescription: "Citadine connectée et stylée.",
    slug: "hyundai-i20"
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
            <p className="text-xs text-white/40 uppercase tracking-widest">
              {car.brand} • {car.year}
            </p>
            <p className="text-sm text-white/50 mt-2">{car.shortDescription}</p>
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
              <div className="text-3xl font-bold text-[#D4AF37] leading-none mb-1">{car.basePrice} <span className="text-sm font-normal text-[#D4AF37]/70">MAD</span></div>
              <div className="text-[10px] text-white/40 uppercase font-mono">À partir de / Jour</div>
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
