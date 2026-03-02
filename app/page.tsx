import Link from 'next/link'
import { getAllPosts, getAllAuthors, getAllCategories } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import PostCard from '@/components/PostCard'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'

export default async function HomePage() {
  const [posts, authors, categories] = await Promise.all([
    getAllPosts(),
    getAllAuthors(),
    getAllCategories(),
  ])

  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 7)

  return (
    <>
      {/* Hero */}
      <HeroSection
        title="Surf Travel Blog"
        subtitle="Chase waves. Discover destinations. Share the stoke."
        imageUrl={
          featuredPost?.metadata?.featured_image?.imgix_url
            ? `${featuredPost.metadata.featured_image.imgix_url}?w=2400&h=1200&fit=crop&auto=format,compress`
            : undefined
        }
        ctaText="Explore Stories"
        ctaHref="/posts"
      />

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-ocean-950 mb-8">
            Featured Story
          </h2>
          <Link
            href={`/posts/${featuredPost.slug}`}
            className="group block rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="grid md:grid-cols-2">
              {featuredPost.metadata?.featured_image?.imgix_url && (
                <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img
                    src={`${featuredPost.metadata.featured_image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                    alt={featuredPost.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                {featuredPost.metadata?.category && (
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-ocean-600 mb-3">
                    {featuredPost.metadata.category.metadata?.name ||
                      featuredPost.metadata.category.title}
                  </span>
                )}
                <h3 className="text-2xl md:text-3xl font-bold text-ocean-950 mb-4 group-hover:text-ocean-700 transition-colors">
                  {featuredPost.title}
                </h3>
                {featuredPost.metadata?.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.metadata.tags
                      .split(',')
                      .slice(0, 3)
                      .map((tag) => (
                        <span
                          key={tag.trim()}
                          className="bg-ocean-50 text-ocean-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                  </div>
                )}
                {featuredPost.metadata?.author && (
                  <p className="text-sm text-gray-500">
                    By{' '}
                    <span className="font-medium text-ocean-700">
                      {featuredPost.metadata.author.metadata?.name ||
                        featuredPost.metadata.author.title}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-ocean-950">
                Recent Stories
              </h2>
              <Link
                href="/posts"
                className="text-ocean-600 hover:text-ocean-700 font-medium text-sm transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-ocean-950 mb-8">
            Explore by Category
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryBadge key={category.id} category={category} variant="card" />
            ))}
          </div>
        </section>
      )}

      {/* Authors */}
      {authors.length > 0 && (
        <section className="bg-ocean-950 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-10">
              Meet the Writers
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {authors.map((author) => (
                <AuthorCard key={author.id} author={author} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}