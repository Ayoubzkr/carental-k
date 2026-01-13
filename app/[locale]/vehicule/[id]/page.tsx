
import { cars } from "@/data/cars"
import { CarDetailsClient } from "@/components/car-details-client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { Link } from "@/navigation"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

// 1. Generate Static Params for SSG/ISR
// Next-intl: we need to generate params for all locales usually, but for generateStaticParams in [locale],
// we should only return id. The locale is handled by upstream [locale] layout.
// However, since [id] is inside [locale], we iterate over cars.
export async function generateStaticParams() {
  return cars.map((car) => ({
    id: car.id.toString(),
  }))
}

// 2. Dynamic Metadata for SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string, locale: string }>
}): Promise<Metadata> {
  const { id, locale } = await params
  const t = await getTranslations({ locale, namespace: "details" })
  const carId = parseInt(id)
  const car = cars.find((c) => c.id === carId)

  if (!car) {
    return {
      title: `${t("notFound")} - K-Rim Car`,
    }
  }

  const title = `${car.name} - K-Rim Car | ${car.basePrice} MAD${t("day")}`
  const description = `${car.name} (${car.year}). ${car.transmission}, ${car.fuel}.`
  const imageUrl = car.colors[0]?.image || "/placeholder.svg"

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: car.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function VehiculeDetailsPage({
  params
}: {
  params: Promise<{ id: string, locale: string }>
}) {
  const { id, locale } = await params
  // Use getTranslations for server-side text
  const t = await getTranslations({ locale, namespace: "details" })

  const carId = parseInt(id)
  const car = cars.find((c) => c.id === carId)

  if (!car) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("notFound")}</h1>
          <Link href="/">
            <Button className="bg-[#D4AF37] text-black hover:bg-[#b0912d]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backHome")}
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  // JSON-LD Structured Data for LocalBusiness/Product (Car)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": car.name,
    "image": [
      car.colors[0]?.image,
      ...car.colors.map(c => c.image)
    ].filter(Boolean),
    "description": car.shortDescription || car.category, // Fallback
    "sku": `CAR-${car.id}`,
    "brand": {
      "@type": "Brand",
      "name": car.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `https://k-rim-car.com/${locale}/vehicule/${car.id}`, // Proper localized URL
      "priceCurrency": "MAD",
      "price": car.basePrice,
      "priceValidUntil": "2025-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "K-Rim Car"
      }
    }
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <CarDetailsClient car={car} />
      <Footer />
    </main>
  )
}
