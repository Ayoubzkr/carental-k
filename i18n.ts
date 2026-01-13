import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Liste des locales supportées
export const locales = ['fr', 'en', 'es', 'ar'] as const;
export type Locale = (typeof locales)[number];

// Locale par défaut
export const defaultLocale: Locale = 'fr';

// Configuration des locales avec métadonnées
export const localeConfig = {
    fr: {
        label: 'Français',
        dir: 'ltr',
        flag: '🇫🇷',
    },
    en: {
        label: 'English',
        dir: 'ltr',
        flag: '🇬🇧',
    },
    es: {
        label: 'Español',
        dir: 'ltr',
        flag: '🇪🇸',
    },
    ar: {
        label: 'العربية',
        dir: 'rtl',
        flag: '🇲🇦',
    },
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !locales.includes(locale as Locale)) {
        notFound();
    }

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,
    };
});
