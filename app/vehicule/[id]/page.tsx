"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Users, Fuel, Settings, ArrowLeft, Check, Gauge,
  MapPin, Camera, Smartphone, Shield, Armchair, Zap, Phone
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Enhanced Type Definition
type Car = {
  id: number
  name: string
  year: number
  category: string
  basePrice: number
  passengers: number
  transmission: string
  fuel: string
  power: string // e.g. "150 ch"
  consumption: string // e.g. "4.5 L/100km"
  gps: boolean
  camera: string // e.g. "Caméra 360°"
  multimedia: string // e.g. "Apple CarPlay"
  description: string
  colors: { name: string; hex: string; image: string }[]
  pricing: {
    daily: number
    weekly: number
    monthly: number
  }
  equipment: {
    comfort: string[]
    security: string[]
  }
}

const cars: Car[] = [
  {
    id: 1,
    name: "Mercedes Classe A",
    year: 2023,
    category: "luxury",
    basePrice: 450,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    power: "150 ch",
    consumption: "4.5 L/100km",
    gps: true,
    camera: "Caméra 360°",
    multimedia: "Apple CarPlay / Android Auto",
    description: "La Mercedes Classe A allie élégance et performance. Avec son design moderne et ses technologies avancées, elle offre une expérience de conduite premium.",
    colors: [
      { name: "Noir", hex: "#000000", image: "/images/cars/mercedes-class-a-black.jpg" },
      { name: "Blanc", hex: "#FFFFFF", image: "/placeholder.svg?height=400&width=600" },
      { name: "Gris", hex: "#808080", image: "/placeholder.svg?height=400&width=600" },
      { name: "Carbone", hex: "#2f2f2f", image: "/placeholder.svg?height=400&width=600" },
    ],
    pricing: {
      daily: 450,
      weekly: 2800,
      monthly: 10000,
    },
    equipment: {
      comfort: [
        "Ecran tactile",
        "Clim bi-zone",
        "Sièges ventilés",
        "Toit ouvrant",
      ],
      security: [
        "ABS",
        "ESP",
        "Airbags",
        "Regulateur / Limiteur",
      ]
    }
  },
  {
    id: 2,
    name: "Volkswagen Tiguan",
    year: 2023,
    category: "suv",
    basePrice: 380,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    power: "150 ch",
    consumption: "5.8 L/100km",
    gps: true,
    camera: "Caméra de recul",
    multimedia: "Android Auto",
    description: "Le Volkswagen Tiguan est un SUV polyvalent qui combine confort, espace et efficacité. Parfait pour les familles et les longs trajets.",
    colors: [
      { name: "Noir", hex: "#000000", image: "/images/cars/tiguan-black.jpg" },
      { name: "Blanc", hex: "#FFFFFF", image: "/placeholder.svg?height=400&width=600" },
      { name: "Gris", hex: "#808080", image: "/placeholder.svg?height=400&width=600" },
    ],
    pricing: {
      daily: 380,
      weekly: 2400,
      monthly: 8500,
    },
    equipment: {
      comfort: [
        "Grand coffre (520L)",
        "Accoudoir central",
        "Climatisation",
        "Bluetooth",
      ],
      security: [
        "Freinage d'urgence",
        "Lane Assist",
        "Airbags rideaux",
        "Isofix",
      ]
    }
  },
  {
    id: 3,
    name: "Cupra Formentor",
    year: 2024,
    category: "sport",
    basePrice: 520,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    power: "310 ch",
    consumption: "8.5 L/100km",
    gps: true,
    camera: "Caméra 360°",
    multimedia: "Wireless CarPlay",
    description: "Le Cupra Formentor incarne la performance et le style. Avec son moteur puissant et son design sportif, il offre une expérience de conduite dynamique.",
    colors: [
      { name: "Gris Mat", hex: "#A9A9A9", image: "/images/cars/cupra-formentor-gray.jpg" },
      { name: "Noir", hex: "#000000", image: "/placeholder.svg?height=400&width=600" },
      { name: "Blanc", hex: "#FFFFFF", image: "/placeholder.svg?height=400&width=600" },
    ],
    pricing: {
      daily: 520,
      weekly: 3300,
      monthly: 12000,
    },
    equipment: {
      comfort: [
        "Sièges baquets",
        "Digital Cockpit",
        "Volant chauffant",
        "Suspension DCC",
      ],
      security: [
        "Front Assist",
        "Détecteur de fatigue",
        "Appel d'urgence",
        "Régulateur adaptatif",
      ]
    }
  },
  {
    id: 4,
    name: "Porsche Macan",
    year: 2024,
    category: "luxury",
    basePrice: 680,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    power: "265 ch",
    consumption: "9.0 L/100km",
    gps: true,
    camera: "Surround View",
    multimedia: "PCM",
    description: "Le Porsche Macan est le SUV sportif par excellence. Alliant la puissance de Porsche au confort d'un SUV premium, il offre une expérience de conduite inégalée.",
    colors: [
      { name: "Noir", hex: "#000000", image: "/images/cars/porsche-macan-black.jpg" },
      { name: "Blanc", hex: "#FFFFFF", image: "/placeholder.svg?height=400&width=600" },
    ],
    pricing: {
      daily: 680,
      weekly: 4500,
      monthly: 18000,
    },
    equipment: {
      comfort: ["Sièges sport", "Bose Surround", "Suspension PASM", "Toit pano"],
      security: ["PDLS Plus", "Lane Change Assist", "Freins Porsche", "Airbags genoux"]
    }
  },
  {
    id: 5,
    name: "Audi A3",
    year: 2023,
    category: "executive",
    basePrice: 420,
    passengers: 5,
    transmission: "Automatique",
    fuel: "Essence",
    power: "150 ch",
    consumption: "5.0 L/100km",
    gps: true,
    camera: "Caméra recul",
    multimedia: "MMI Touch",
    description: "L'Audi A3 est une berline compacte premium qui allie élégance, technologie et performance. Parfaite pour les professionnels exigeants.",
    colors: [
      { name: "Gris", hex: "#4B5563", image: "/images/cars/audi-a3-gray.jpg" },
    ],
    pricing: {
      daily: 420,
      weekly: 2700,
      monthly: 9000,
    },
    equipment: {
      comfort: ["Audi Virtual Cockpit", "Clim auto", "Audi Sound System", "Drive Select"],
      security: ["Pre Sense Front", "Lane Departure", "Airbags latéraux", "Isofix"]
    }
  },
  {
    id: 6,
    name: "Range Rover Sport",
    year: 2024,
    category: "suv",
    basePrice: 750,
    passengers: 7,
    transmission: "Automatique",
    fuel: "Diesel",
    power: "300 ch",
    consumption: "7.5 L/100km",
    gps: true,
    camera: "3D Surround",
    multimedia: "Pivi Pro",
    description: "Le Range Rover Sport est le summum du luxe SUV. Avec son design emblématique et ses technologies de pointe, il offre un confort et une performance exceptionnels.",
    colors: [
      { name: "Noir", hex: "#000000", image: "/placeholder.svg?height=400&width=600" },
    ],
    pricing: {
      daily: 750,
      weekly: 5000,
      monthly: 20000,
    },
    equipment: {
      comfort: ["Suspension pneumatique", "Meridian Sound", "Sièges massants", "Soft Close"],
      security: ["Wade Sensing", "ClearSight", "Freinage urgence", "Contrôle descente"]
    }
  },
]

export default function VehiculeDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const carId = parseInt(params.id as string)
  const car = cars.find((c) => c.id === carId)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)

  if (!car) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Véhicule non trouvé</h1>
          <Button onClick={() => router.push("/")} className="bg-[#D4AF37] text-black hover:bg-[#b0912d]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </div>
        <Footer />
      </main>
    )
  }

  const currentImage = car.colors[selectedColorIndex]?.image || "/placeholder.svg"

  const handleBooking = (price: number, period: string) => {
    const message = `Bonjour, je souhaite réserver la ${car.name} (${period}) à ${price} MAD.`
    const whatsappUrl = `https://wa.me/212665123330?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  // Common wrapper for spec items
  const SpecItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | number }) => (
    <div className="flex flex-col gap-1 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-colors">
      <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
        <Icon className="h-5 w-5" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  )

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      <Header />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux véhicules
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden mb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#D4AF37]">
                {car.name}
              </h1>
              <div className="flex flex-wrap gap-4 text-gray-400 mb-8 text-lg">
                <span>{car.year}</span>
                <span>•</span>
                <span>{car.transmission}</span>
                <span>•</span>
                <span>{car.fuel}</span>
              </div>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-gray-400">À partir de</span>
                <span className="text-4xl font-bold text-[#D4AF37]">{car.basePrice} MAD</span>
                <span className="text-gray-400">/Jour</span>
              </div>

              <Button
                onClick={() => handleBooking(car.pricing.daily, "Journalier")}
                className="bg-[#D4AF37] text-black hover:bg-[#b0912d] rounded-full px-8 py-6 text-lg font-semibold"
              >
                Réserver maintenant
                <Phone className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#D4AF37] blur-[100px] opacity-20 rounded-full" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedColorIndex}
                  src={currentImage}
                  alt={car.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 w-full object-contain drop-shadow-2xl"
                />
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery & Colors Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main View */}
          <div className="lg:col-span-2 bg-[#111] rounded-2xl overflow-hidden border border-white/10 relative h-[400px] flex items-center justify-center p-8 group">
            <motion.img
              key={`gallery-${selectedColorIndex}`}
              src={currentImage}
              alt="Vue detail"
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Color Selector */}
          <div className="bg-[#111] rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-semibold mb-6">Couleurs Disponibles</h3>
            <div className="flex flex-wrap gap-4 mb-8">
              {car.colors.map((color, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => setSelectedColorIndex(index)}
                    className={cn(
                      "w-12 h-12 rounded-full border-2 transition-all p-1",
                      selectedColorIndex === index ? "border-[#D4AF37]" : "border-white/20"
                    )}
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                  <span className={cn(
                    "text-xs",
                    selectedColorIndex === index ? "text-[#D4AF37]" : "text-gray-500"
                  )}>{color.name}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {/* Dummy thumbnails for the gallery look */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-white/5 rounded-lg overflow-hidden cursor-pointer hover:ring-1 hover:ring-[#D4AF37]">
                  <img src={currentImage} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specs Grid */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold mb-8 border-l-4 border-[#D4AF37] pl-4">Caractéristiques</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SpecItem icon={Settings} label="Transmission" value={car.transmission} />
          <SpecItem icon={Fuel} label="Carburant" value={car.fuel} />
          <SpecItem icon={Users} label="Places" value={`${car.passengers} Places`} />
          <SpecItem icon={Zap} label="Puissance" value={car.power} />
          <SpecItem icon={Gauge} label="Consommation" value={car.consumption} />
          <SpecItem icon={MapPin} label="GPS" value={car.gps ? "Intégré" : "Non"} />
          <SpecItem icon={Camera} label="Caméra" value={car.camera} />
          <SpecItem icon={Smartphone} label="Connectivité" value="CarPlay / Android" />
        </div>
      </section>

      {/* Equipments */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Comfort */}
          <div className="bg-[#111] p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Armchair className="text-[#D4AF37] h-6 w-6" />
              <h3 className="text-2xl font-semibold">Équipements Confort</h3>
            </div>
            <ul className="space-y-4">
              {car.equipment.comfort.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="text-[#D4AF37] h-5 w-5" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Security */}
          <div className="bg-[#111] p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-[#D4AF37] h-6 w-6" />
              <h3 className="text-2xl font-semibold">Sécurité</h3>
            </div>
            <ul className="space-y-4">
              {car.equipment.security.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="text-[#D4AF37] h-5 w-5" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Tarifs de location</h2>
        <div className="grid md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {/* Daily */}
          <div className="bg-[#111] p-8 rounded-2xl border border-white/10 hover:border-[#D4AF37]/30 transition-all text-center">
            <h3 className="text-2xl font-semibold mb-2">Journalier</h3>
            <div className="text-3xl font-bold text-[#D4AF37] mb-2">{car.pricing.daily} MAD</div>
            <p className="text-sm text-gray-500 mb-6">Tout inclus</p>
            <Button
              onClick={() => handleBooking(car.pricing.daily, "Journalier")}
              variant="outline"
              className="w-full border-white/20 hover:bg-[#D4AF37] hover:text-black hover:border-transparent transition-all"
            >
              Réserver
            </Button>
          </div>

          {/* Weekly - Highlighted */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#0f0f0f] p-8 rounded-2xl border-2 border-[#D4AF37] relative text-center shadow-[0_0_30px_rgba(212,175,55,0.1)]"
          >
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black hover:bg-[#b0912d]">
              Le plus populaire
            </Badge>
            <h3 className="text-2xl font-semibold mb-2 text-[#D4AF37]">Hebdomadaire</h3>
            <div className="text-4xl font-bold text-white mb-2">{car.pricing.weekly} MAD</div>
            <p className="text-sm text-gray-400 mb-6">Tout inclus</p>
            <Button
              onClick={() => handleBooking(car.pricing.weekly, "Hebdomadaire")}
              className="w-full bg-[#D4AF37] text-black hover:bg-[#b0912d]"
            >
              Réserver maintenant
            </Button>
          </motion.div>

          {/* Monthly */}
          <div className="bg-[#111] p-8 rounded-2xl border border-white/10 hover:border-[#D4AF37]/30 transition-all text-center">
            <h3 className="text-2xl font-semibold mb-2">Mensuel</h3>
            <div className="text-3xl font-bold text-[#D4AF37] mb-2">{car.pricing.monthly} MAD</div>
            <p className="text-sm text-gray-500 mb-6">Tout inclus</p>
            <Button
              onClick={() => handleBooking(car.pricing.monthly, "Mensuel")}
              variant="outline"
              className="w-full border-white/20 hover:bg-[#D4AF37] hover:text-black hover:border-transparent transition-all"
            >
              Réserver
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
