
"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Users, Fuel, Settings, ArrowLeft, Check, Gauge,
    MapPin, Camera, Smartphone, Shield, Armchair, Zap, Phone,
    Calendar as CalendarIcon, User, MapPin as MapPinIcon
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// UI Components for Reservation Form
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format, differenceInDays } from "date-fns"
import { fr } from "date-fns/locale"
import { Car } from "@/data/cars"

interface CarDetailsClientProps {
    car: Car
}

export function CarDetailsClient({ car }: CarDetailsClientProps) {
    const router = useRouter()
    const [selectedColorIndex, setSelectedColorIndex] = useState(0)

    // Reservation State
    const [isReservationOpen, setIsReservationOpen] = useState(false)
    const [name, setName] = useState("")
    const [startDate, setStartDate] = useState<Date | undefined>()
    const [endDate, setEndDate] = useState<Date | undefined>()
    const [pickupType, setPickupType] = useState("agence") // 'agence' or 'livraison'
    const [pickupLocation, setPickupLocation] = useState("")
    const [withBabySeat, setWithBabySeat] = useState(false)
    const [withInsurance, setWithInsurance] = useState(false)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [heroImage, setHeroImage] = useState<string | null>(null)

    useEffect(() => {
        if (car) {
            if (car.galleryFolder) {
                setHeroImage(`${car.galleryFolder}/1.jpg`)
            } else {
                setHeroImage(car.colors[0]?.image || "/placeholder.svg")
            }
        }
    }, [car])

    useEffect(() => {
        if (car && !car.galleryFolder && car.colors[selectedColorIndex]) {
            setHeroImage(car.colors[selectedColorIndex].image)
        }
    }, [selectedColorIndex, car])

    useEffect(() => {
        if (!car) return

        let days = 1
        if (startDate && endDate) {
            days = Math.max(1, differenceInDays(endDate, startDate) + 1)
        }

        let dailyRate = car.pricing.daily
        if (days >= 30) {
            dailyRate = car.pricing.monthly / 30
        } else if (days >= 7) {
            dailyRate = car.pricing.weekly / 7
        }

        let baseTotal = dailyRate * days

        if (withBabySeat) baseTotal += (50 * days)
        if (withInsurance) baseTotal += (100 * days)

        setTotalPrice(Math.round(baseTotal))

    }, [car, startDate, endDate, withBabySeat, withInsurance])


    const handleWhatsAppReservation = () => {
        if (!car || !startDate || !endDate || !name) return

        const formattedStart = format(startDate, 'dd/MM/yyyy', { locale: fr })
        const formattedEnd = format(endDate, 'dd/MM/yyyy', { locale: fr })
        const days = differenceInDays(endDate, startDate) + 1

        const message = `*Nouvelle Réservation - K-Rim Car*
    
📅 *Période*: ${formattedStart} au ${formattedEnd} (${days} jours)
🚗 *Véhicule*: ${car.name}
👤 *Client*: ${name}
📍 *Retrait*: ${pickupType === 'agence' ? "À l'agence" : `Livraison à ${pickupLocation}`}

⚙️ *Options*:
${withBabySeat ? "- Siège bébé" : ""}
${withInsurance ? "- Assurance complète" : ""}

💰 *Prix Total Estimé*: ${totalPrice} MAD`

        const whatsappUrl = `https://wa.me/212665123330?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")
        setIsReservationOpen(false)
    }

    const currentImage = car.colors[selectedColorIndex]?.image || "/placeholder.svg"

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
        <>
            <div className="container mx-auto px-4 py-6">
                <Button
                    onClick={() => {
                        window.location.href = '/#catalog'
                    }}
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

                            <Dialog open={isReservationOpen} onOpenChange={setIsReservationOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        className="bg-[#D4AF37] text-black hover:bg-[#b0912d] rounded-full px-8 py-6 text-lg font-semibold"
                                    >
                                        Réserver maintenant
                                        <Phone className="ml-2 h-5 w-5" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px] bg-[#0F0F0F] border border-[#D4AF37]/30 text-white p-0 overflow-hidden">
                                    <DialogHeader className="p-6 pb-2 text-center border-b border-white/10 bg-[#151515]">
                                        <DialogTitle className="text-2xl font-playfair font-bold text-[#D4AF37]">
                                            Réserver la {car.name}
                                        </DialogTitle>
                                        <p className="text-xs text-white/50 mt-1">
                                            Remplissez les informations ci-dessous pour confirmer votre réservation via WhatsApp.
                                        </p>
                                    </DialogHeader>

                                    <div className="p-6 space-y-5">
                                        {/* Simplified Form Content for brevity in update, keep original logic */}
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-[#D4AF37] flex items-center gap-2">
                                                <User className="w-4 h-4" /> Nom complet *
                                            </Label>
                                            <Input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Votre nom"
                                                className="bg-black/50 border-white/10 text-white focus:border-[#D4AF37] rounded-md h-11"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-[#D4AF37] flex items-center gap-2">
                                                    <CalendarIcon className="w-4 h-4" /> Date de début *
                                                </Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal bg-black/50 border-white/10 text-white hover:bg-black/70 hover:text-white h-11",
                                                                !startDate && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {startDate ? format(startDate, "dd/MM/yyyy") : <span className="text-white/40">Choisir...</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 bg-[#1a1a1a] border-[#D4AF37]/20 text-white">
                                                        <Calendar
                                                            mode="single"
                                                            selected={startDate}
                                                            onSelect={setStartDate}
                                                            initialFocus
                                                            className="pointer-events-auto"
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-[#D4AF37] flex items-center gap-2">
                                                    <CalendarIcon className="w-4 h-4" /> Date de fin *
                                                </Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal bg-black/50 border-white/10 text-white hover:bg-black/70 hover:text-white h-11",
                                                                !endDate && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {endDate ? format(endDate, "dd/MM/yyyy") : <span className="text-white/40">Choisir...</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 bg-[#1a1a1a] border-[#D4AF37]/20 text-white">
                                                        <Calendar
                                                            mode="single"
                                                            selected={endDate}
                                                            onSelect={setEndDate}
                                                            initialFocus
                                                            className="pointer-events-auto"
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-[#D4AF37] flex items-center gap-2">
                                                <MapPinIcon className="w-4 h-4" /> Type de retrait *
                                            </Label>
                                            <Select value={pickupType} onValueChange={setPickupType}>
                                                <SelectTrigger className="w-full bg-black/50 border-white/10 text-white focus:ring-[#D4AF37] h-11">
                                                    <SelectValue placeholder="Choisir le type de retrait" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#1a1a1a] border border-white/10 text-white">
                                                    <SelectItem value="agence">À l'agence</SelectItem>
                                                    <SelectItem value="livraison">Livraison</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {pickupType === "livraison" && (
                                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                                <Label className="text-sm font-medium text-[#D4AF37]">Lieu de livraison</Label>
                                                <Input
                                                    value={pickupLocation}
                                                    onChange={(e) => setPickupLocation(e.target.value)}
                                                    placeholder="Adresse, Hôtel, Aéroport..."
                                                    className="bg-black/50 border-white/10 text-white focus:border-[#D4AF37] h-11"
                                                />
                                            </div>
                                        )}

                                        <div className="py-2 space-y-3 border-t border-white/10 mt-2">
                                            <h4 className="text-sm font-medium text-white/70">Options</h4>
                                            <div className="flex items-center space-x-2 bg-black/30 p-3 rounded-lg border border-white/5 hover:border-[#D4AF37]/30 transition-colors">
                                                <Checkbox
                                                    id="baby-seat"
                                                    checked={withBabySeat}
                                                    onCheckedChange={(c) => setWithBabySeat(c as boolean)}
                                                    className="border-white/30 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]"
                                                />
                                                <Label htmlFor="baby-seat" className="text-sm font-normal cursor-pointer flex-1">Siège bébé (+50 MAD/j)</Label>
                                            </div>
                                            <div className="flex items-center space-x-2 bg-black/30 p-3 rounded-lg border border-white/5 hover:border-[#D4AF37]/30 transition-colors">
                                                <Checkbox
                                                    id="insurance"
                                                    checked={withInsurance}
                                                    onCheckedChange={(c) => setWithInsurance(c as boolean)}
                                                    className="border-white/30 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]"
                                                />
                                                <Label htmlFor="insurance" className="text-sm font-normal cursor-pointer flex-1">Assurance complète (+100 MAD/j)</Label>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-white/10 flex flex-col items-center gap-4">
                                            <div className="text-center">
                                                <span className="text-sm text-white/50 block mb-1">Prix total estimé</span>
                                                <span className="text-3xl font-bold text-[#D4AF37]">{totalPrice} MAD</span>
                                            </div>
                                            <Button
                                                disabled={!startDate || !endDate || !name}
                                                onClick={handleWhatsAppReservation}
                                                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8A2C] text-black hover:opacity-90 font-bold py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all transform hover:scale-[1.02]"
                                            >
                                                Confirmer via WhatsApp
                                                <img src="/whatsapp.svg" alt="WA" className="ml-2 w-6 h-6" />
                                            </Button>
                                            <p className="text-[10px] text-white/30 text-center max-w-xs">
                                                Vous serez redirigé vers une conversation WhatsApp avec nos équipes pour finaliser votre réservation.
                                            </p>
                                        </div>

                                    </div>
                                </DialogContent>
                            </Dialog>

                        </motion.div>

                        {/* Right Image - NOW OPTIMIZED */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative h-[400px] lg:h-[500px] w-full flex items-center justify-center"
                        >
                            <div className="absolute inset-0 bg-[#D4AF37] blur-[100px] opacity-20 rounded-full" />
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={heroImage}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative z-10 w-full h-full"
                                >
                                    <Image
                                        src={heroImage || "/placeholder.svg"}
                                        alt={car.name}
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        style={{ objectPosition: 'center 60%' }}
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gallery & Colors Section */}
            <motion.section
                className="container mx-auto px-4 mb-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main View */}
                    <div className="lg:col-span-2 bg-[#111] rounded-2xl overflow-hidden border border-white/10 relative h-[500px] md:h-[600px] flex items-center justify-center p-4 group">
                        <motion.div
                            key={heroImage} // Key helps trigger simple re-render for new image, motion handles opacity via AnimatePresence if wrapper used, but here simpler key swap is okay
                            className="relative w-full h-full"
                        >
                            <Image
                                src={heroImage || "/placeholder.svg"}
                                alt="Vue detail"
                                fill
                                className="object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                        </motion.div>
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
                            {/* Gallery thumbnails 2-5 - NOW OPTIMIZED */}
                            {[2, 3, 4, 5].map((i) => (
                                <div key={i} className="relative aspect-square bg-white/5 rounded-lg overflow-hidden cursor-pointer hover:ring-1 hover:ring-[#D4AF37]">
                                    <Image
                                        src={car.galleryFolder ? `${car.galleryFolder}/${i}.jpg` : currentImage}
                                        className="object-cover opacity-50 hover:opacity-100 transition-opacity"
                                        alt={`Vue ${i}`}
                                        fill
                                        sizes="(max-width: 768px) 25vw, 15vw"
                                        onClick={() => {
                                            if (car.galleryFolder) {
                                                setHeroImage(`${car.galleryFolder}/${i}.jpg`)
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Specs Grid */}
            <motion.section
                className="container mx-auto px-4 mb-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
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
            </motion.section>

            {/* Equipments */}
            <motion.section
                className="container mx-auto px-4 mb-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
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
            </motion.section>

            {/* Pricing Cards */}
            <motion.section
                className="container mx-auto px-4 mb-24"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold text-center mb-12">Tarifs de location</h2>
                <div className="grid md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
                    {/* Daily */}
                    <div className="bg-[#111] p-8 rounded-2xl border border-white/10 hover:border-[#D4AF37]/30 transition-all text-center">
                        <h3 className="text-2xl font-semibold mb-2">Journalier</h3>
                        <div className="text-3xl font-bold text-[#D4AF37] mb-2">{car.pricing.daily} MAD</div>
                        <p className="text-sm text-gray-500 mb-6">Tout inclus</p>
                        <Button
                            onClick={() => setIsReservationOpen(true)}
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
                            onClick={() => setIsReservationOpen(true)}
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
                            onClick={() => setIsReservationOpen(true)}
                            variant="outline"
                            className="w-full border-white/20 hover:bg-[#D4AF37] hover:text-black hover:border-transparent transition-all"
                        >
                            Réserver
                        </Button>
                    </div>
                </div>
            </motion.section>
        </>
    )
}
