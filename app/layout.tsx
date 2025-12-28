import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "K-Rim Car | Location de Voitures de Luxe & Services de Lavage Automobile Professionnels",
  description:
    "Découvrez la location de voitures de luxe et les services de lavage automobile professionnels avec K-Rim Car. Véhicules premium, service exceptionnel et qualité inégalée.",
  generator: "v0.app",
  keywords: [
    "luxury car rental",
    "premium car wash",
    "car rental services",
    "professional car wash",
    "K-Rim Car",
    "location voiture luxe",
    "lavage auto premium",
    "services location voiture",
    "lavage automobile professionnel",
    "voiture de luxe Maroc",
  ],
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
