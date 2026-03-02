import type { Metadata } from 'next'
import { getAllCategories } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'

export const metadata: Metadata = {
  title: 'Categories — Surf Travel Blog',
  description: 'Browse surf travel stories by category and destination.',
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-br from-ocean-950 via-ocean-900 to-ocean-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Categories
          </h1>
          <p className="text-ocean-200 text-lg max-w-2xl mx-auto">
            Explore surf travel stories organized by topic and destination.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No categories found.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryBadge key={category.id} category={category} variant="card" />
            ))}
          </div>
        )}
      </section>
    </>
  )
}