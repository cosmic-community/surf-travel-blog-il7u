import Link from 'next/link'

interface HeroSectionProps {
  title: string
  subtitle: string
  imageUrl?: string
  ctaText?: string
  ctaHref?: string
}

export default function HeroSection({
  title,
  subtitle,
  imageUrl,
  ctaText,
  ctaHref,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          width={1200}
          height={600}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-800 via-ocean-700 to-ocean-600" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-ocean-950/60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
          {title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-ocean-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          {subtitle}
        </p>
        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-white text-ocean-950 px-8 py-4 rounded-full text-sm font-semibold hover:bg-ocean-50 transition-colors shadow-lg hover:shadow-xl"
          >
            {ctaText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        )}
      </div>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 md:h-24"
          viewBox="0 0 1440 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 96L48 85.3C96 75 192 53 288 42.7C384 32 480 32 576 42.7C672 53 768 75 864 80C960 85 1056 75 1152 64C1248 53 1344 43 1392 37.3L1440 32V96H1392C1344 96 1248 96 1152 96C1056 96 960 96 864 96C768 96 672 96 576 96C480 96 384 96 288 96C192 96 96 96 48 96H0Z"
            className="fill-sand-50"
          />
        </svg>
      </div>
    </section>
  )
}