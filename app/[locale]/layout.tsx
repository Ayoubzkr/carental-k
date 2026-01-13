import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, localeConfig, type Locale } from '@/i18n';
import { LanguageSwitcher } from "@/components/language-switcher";
import { SplashScreen } from "@/components/splash-screen";
import "../globals.css"

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

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    // URLs alternatives pour hreflang
    const alternateLanguages: Record<string, string> = {};
    locales.forEach((loc) => {
        alternateLanguages[loc] = `https://krimcar.ma/${loc}`;
    });

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        generator: "v0.app",
        icons: {
            icon: "/favicon.ico",
        },
        alternates: {
            canonical: `https://krimcar.ma/${locale}`,
            languages: alternateLanguages,
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: `https://krimcar.ma/${locale}`,
            siteName: 'K-Rim Car',
            locale: locale,
            type: 'website',
            images: [
                {
                    url: 'https://krimcar.ma/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'K-Rim Car - Location de Voitures de Luxe',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
            images: ['https://krimcar.ma/og-image.jpg'],
        },
    };
}

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    // Valider que la locale entrante est valide
    if (!locales.includes(locale as Locale)) {
        notFound();
    }

    // Récupérer les messages pour la locale actuelle
    const messages = await getMessages();

    // Récupérer la configuration de la locale (dir, etc.)
    const { dir } = localeConfig[locale as Locale];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AutoRental",
        "name": "K-Rim Car",
        "image": "https://krimcar.ma/logo.png",
        "description": "Location de voitures de luxe et services de lavage automobile professionnels à Tanger.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ain ktiouet Av. d'Angleterre",
            "addressLocality": "Tanger",
            "postalCode": "90000",
            "addressCountry": "MA"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 35.7770,
            "longitude": -5.8037
        },
        "url": `https://krimcar.ma/${locale}`,
        "telephone": "+212665123330",
        "priceRange": "$$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ],
                "opens": "09:00",
                "closes": "22:00"
            }
        ],
        "inLanguage": locales,
    }

    return (
        <html lang={locale} dir={dir}>
            <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <NextIntlClientProvider messages={messages}>
                    <SplashScreen>
                        {children}
                        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <LanguageSwitcher />
                        </div>
                    </SplashScreen>
                </NextIntlClientProvider>
                <Analytics />
            </body>
        </html>
    )
}
