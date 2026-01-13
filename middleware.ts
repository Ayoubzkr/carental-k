import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
    // Liste de toutes les locales supportées
    locales,

    // Locale par défaut utilisée quand aucune locale ne correspond
    defaultLocale,

    // Toujours utiliser un préfixe de locale dans l'URL
    localePrefix: 'always',

    // Détecter automatiquement la locale depuis les headers Accept-Language
    localeDetection: true,
});

export const config = {
    // Matcher pour ignorer les fichiers statiques et les routes API
    matcher: [
        // Activer un préfixe de locale pour toutes les routes sauf :
        // - API routes
        // - Fichiers statiques (_next/static)
        // - Fichiers d'images (_next/image)
        // - Fichiers dans /public (favicon.ico, etc.)
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|robots.txt|sitemap.xml).*)',
    ],
};
