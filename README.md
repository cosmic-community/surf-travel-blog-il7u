# 🏄 Surf Travel Blog

![Surf Travel Blog](https://imgix.cosmicjs.com/a10e2550-43cd-11f0-b2af-f9a1dba532c9-pexels-jess-loiterton-4321080.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A stunning surf travel blog and creative portfolio built with **Next.js 16** and **Cosmic CMS**. Showcases surf travel stories, destinations, authors, and categories with a beautiful ocean-inspired design.

## Features

- 🌊 **Ocean-Inspired Design** — Deep blues, sandy neutrals, and turquoise accents
- 📝 **Dynamic Blog Posts** — Rich content with featured images, tags, authors, and categories
- 👤 **Author Profiles** — Dedicated pages for each surf travel writer
- 🏷️ **Category Pages** — Browse posts by destination or topic
- 📱 **Fully Responsive** — Mobile-first design that looks great everywhere
- 🚀 **Server-Side Rendering** — Fast page loads with Next.js 16 App Router
- 🔍 **SEO Optimized** — Proper metadata on every page
- ☁️ **Cosmic CMS** — All content managed through Cosmic's headless CMS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69a61099b216b988224368ce&clone_repository=69a611e611814e857d308382)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories."

### Code Generation Prompt

> "Build a Next.js application for a creative portfolio called 'Surf Travel Blog'. The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS
- [Cosmic CMS](https://www.cosmicjs.com/docs) — Headless content management
- [@cosmicjs/sdk](https://www.npmjs.com/package/@cosmicjs/sdk) — Cosmic JavaScript SDK

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js 18+)
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing `posts`, `authors`, and `categories` object types

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd surf-travel-blog

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic bucket credentials

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)
```

### Fetching a Single Post by Slug

```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post-slug' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)
```

### Fetching Authors

```typescript
const { objects: authors } = await cosmic.objects
  .find({ type: 'authors' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses Cosmic as a headless CMS with three content types:

| Object Type | Description | Key Metafields |
|---|---|---|
| **Posts** | Surf travel blog articles | featured_image, content, tags, author, category |
| **Authors** | Travel writers and contributors | name, bio, profile_photo, social_link |
| **Categories** | Content organization | name, description |

All data fetching happens server-side using Next.js Server Components for optimal performance and security. The Cosmic SDK is configured in `lib/cosmic.ts` with environment variables.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import on [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Set publish directory to `.next`
5. Add environment variables
6. Deploy!

---

Built with ❤️ using [Next.js](https://nextjs.org) and [Cosmic](https://www.cosmicjs.com)

<!-- README_END -->