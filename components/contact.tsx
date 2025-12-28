"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Nouveau contact:\nNom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone}\nService: ${formData.service}\nMessage: ${formData.message}`
    const whatsappUrl = `https://wa.me/212665123330?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="contact" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block mb-4 px-6 py-2 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5">
            <span className="text-sm font-mono uppercase tracking-wider text-[#D4AF37]">Contactez-Nous</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-white text-balance">
            Contactez-Nous Aujourd'hui
          </h2>

          <p className="text-lg text-white/60 text-balance leading-relaxed">
            Vous avez des questions? Nous sommes là pour vous aider. Contactez-nous et discutons de la façon dont nous pouvons vous servir.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {/* Left Column: Contact Form */}
          <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl font-playfair font-bold text-white mb-8">Envoyez-Nous un Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-3">Votre Nom</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#111] border-white/10 text-white placeholder:text-white/20 h-12 focus:border-[#D4AF37] transition-colors"
                  placeholder="Entrez votre nom complet"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-3">Adresse Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-[#111] border-white/10 text-white placeholder:text-white/20 h-12 focus:border-[#D4AF37] transition-colors"
                  placeholder="exemple@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-3">Numéro de Téléphone</label>
                <div className="flex bg-[#111] border border-white/10 rounded-md focus-within:border-[#D4AF37] transition-colors overflow-hidden">
                  <div className="flex items-center justify-center px-4 bg-[#1a1a1a] border-r border-white/10 text-white/60 text-sm">
                    +212
                  </div>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-transparent border-none text-white placeholder:text-white/20 h-12 focus-visible:ring-0"
                    placeholder="6 XX XX XX XX"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-3">
                  Service qui Vous Intéresse
                </label>
                <Select onValueChange={(val) => setFormData({ ...formData, service: val })}>
                  <SelectTrigger className="bg-[#111] border-white/10 text-white h-12 focus:border-[#D4AF37]">
                    <SelectValue placeholder="Sélectionnez un service" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111] border-[#D4AF37]/20 text-white">
                    <SelectItem value="rental">Location de Voitures</SelectItem>
                    <SelectItem value="wash">Lavage Automobile</SelectItem>
                    <SelectItem value="both">Les Deux Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-3">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-[#111] border-white/10 text-white placeholder:text-white/20 min-h-[150px] focus:border-[#D4AF37] resize-none p-4"
                  placeholder="Parlez-nous de vos besoins..."
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-[#D4AF37] text-black hover:bg-[#b0912d] font-bold text-lg h-14 mt-4 tracking-wide uppercase">
                Envoyer le Message
              </Button>
            </form>
          </div>

          {/* Right Column: Contact Info */}
          <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-8 md:p-12 shadow-2xl flex flex-col h-full">
            <div className="mb-8 pb-4 border-b border-[#D4AF37]/20">
              <h3 className="text-sm font-mono text-[#D4AF37] uppercase tracking-[0.2em] mb-1">Contact Info</h3>
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="h-8 w-8 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-2xl font-playfair font-bold text-white mb-1">K-RIM CAR</h4>
                  <p className="text-white/70 mb-4">Route de Malabata, Tanger, Maroc</p>

                  <Button
                    variant="outline"
                    className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent"
                    onClick={() => window.open("https://maps.app.goo.gl/K1XK6GjvZgzkNQ8v9", "_blank")}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Voir sur Google Maps
                  </Button>
                </div>
              </div>

              {/* Map Embed */}
              <div className="w-full h-[300px] rounded-lg overflow-hidden border border-[#D4AF37]/20 relative group mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d-5.795!3d35.774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b800645069fd1%3A0xc64d42065844bca1!2sK-RIM%20CAR!5e0!3m2!1sen!2sma!4v1714150000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <div className="space-y-8 mt-auto">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/5">
                  <Phone className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-white text-lg font-bold tracking-wide">+212 665 123 330</div>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/5">
                  <Mail className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-white text-lg font-bold tracking-wide">contact@krimcar.com</div>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/5">
                  <Clock className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-white font-medium">Lundi - Vendredi : 9h00 - 19h00</div>
                  <div className="text-white/60 text-sm">Samedi : 10h00 - 14h00</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
