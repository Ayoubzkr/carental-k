"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function SplashScreen({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Vérifier si le splash screen a déjà été affiché dans cette session
        const hasSplashed = sessionStorage.getItem("hasSplashed")

        if (hasSplashed) {
            setIsLoading(false)
        } else {
            const timer = setTimeout(() => {
                setIsLoading(false)
                sessionStorage.setItem("hasSplashed", "true")
            }, 1500) // Durée optimisée à 1.5s

            return () => clearTimeout(timer)
        }
    }, [])

    return (
        <AnimatePresence mode="wait">
            {isLoading ? (
                <motion.div
                    key="splash"
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                >
                    <div className="relative flex flex-col items-center">
                        {/* Logo Container */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative z-10 mb-6"
                        >
                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-[#D4AF37]/20 p-1">
                                <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
                                    <Image
                                        src="/images/k-rim-logo.jpg"
                                        alt="K-Rim Car"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                {/* Rotating Gold Border Effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#D4AF37] border-r-[#D4AF37]"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                                />
                            </div>
                        </motion.div>

                        {/* Brand Text Reveal */}
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                className="text-3xl md:text-4xl font-playfair font-bold text-[#D4AF37] tracking-wider text-center"
                            >
                                K-RIM CAR
                            </motion.h1>
                        </div>

                        <div className="overflow-hidden mt-2">
                            <motion.p
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                className="text-white/50 text-xs md:text-sm uppercase tracking-[0.2em]"
                            >
                                Luxury Experience
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <>{children}</>
            )}
        </AnimatePresence>
    )
}
