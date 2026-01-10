
import { MetadataRoute } from 'next'
import { cars } from '@/data/cars'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://k-rim-car.com'

    const carUrls = cars.map((car) => ({
        url: `${baseUrl}/vehicule/${car.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        // Add other static pages if you have them e.g. /contact, /services
        // For now base project seems to be single page with sections or minimal routing
        ...carUrls,
    ]
}
