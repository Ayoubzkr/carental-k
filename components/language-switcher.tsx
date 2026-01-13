"use client"

import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/navigation"
import { Button } from "@/components/ui/button"
import { localeConfig, type Locale } from "@/i18n"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const FlagFR = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 3 2" className={className}>
        <rect width="1" height="2" x="0" fill="#0055A4" />
        <rect width="1" height="2" x="1" fill="#FFFFFF" />
        <rect width="1" height="2" x="2" fill="#EF4135" />
    </svg>
)

const FlagES = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 3 2" className={className}>
        <rect width="3" height="2" fill="#AA151B" />
        <rect width="3" height="1" y="0.5" fill="#F1BF00" />
    </svg>
)

const FlagMA = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 3 2" className={className}>
        <rect width="3" height="2" fill="#C1272D" />
        {/* Star (Pentagram) - Simplified representation */}
        <path d="M1.5 0.7 L1.65 1.2 H2.15 L1.75 1.5 L1.9 2 L1.5 1.7 L1.1 2 L1.25 1.5 L0.85 1.2 H1.35 Z" fill="none" stroke="#006233" strokeWidth="0.15" />
        {/* Filled star for better visibility at small sizes */}
        <path d="M1.5 0.7 L1.65 1.2 H2.15 L1.75 1.5 L1.9 2 L1.5 1.7 L1.1 2 L1.25 1.5 L0.85 1.2 H1.35 Z" fill="#006233" />
    </svg>
)

const FlagGB = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 60 30" className={className}>
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
)

const flags = {
    fr: FlagFR,
    en: FlagGB,
    es: FlagES,
    ar: FlagMA,
}

export function LanguageSwitcher() {
    const locale = useLocale() as Locale
    const router = useRouter()
    const pathname = usePathname()
    // un-used translations hook removed to clean up if not needed, but keeping for safety
    // const t = useTranslations("common")

    const handleLocaleChange = (newLocale: Locale) => {
        router.replace(pathname, { locale: newLocale })
    }

    const CurrentFlag = flags[locale]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-black/90 backdrop-blur-md text-white border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] px-3 gap-2 h-10 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300">
                    <span className="sr-only">Changer de langue</span>
                    <CurrentFlag className="w-5 h-3.5 rounded-[2px] object-cover shadow-sm" />
                    <span className="uppercase text-xs font-bold tracking-wide">{locale}</span>
                    <ChevronDown className="h-3 w-3 opacity-70" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="end" className="bg-[#111]/95 backdrop-blur-xl border border-[#D4AF37]/20 text-white min-w-[150px] p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-xl mb-2">
                {Object.entries(localeConfig).map(([key, config]) => {
                    const Flag = flags[key as Locale]
                    return (
                        <DropdownMenuItem
                            key={key}
                            onClick={() => handleLocaleChange(key as Locale)}
                            className={`cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#D4AF37]/10 focus:bg-[#D4AF37]/10 transition-colors ${locale === key ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "text-white/80"
                                }`}
                        >
                            <Flag className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0" />
                            <span className="text-sm font-medium">{config.label}</span>
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
