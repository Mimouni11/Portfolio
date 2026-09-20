import type { MetadataRoute } from 'next'
import { SITE_URL, LOCALES } from '@/lib/config'
import { getProjects } from '@/data/projects'

const staticRoutes = ['', '/about', '/projects', '/contact']

function alternates(path: string) {
  return Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getProjects('en').map((p) => p.slug)

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((path) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'yearly' : 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
      alternates: { languages: alternates(path) },
    }))
  )

  const projectEntries: MetadataRoute.Sitemap = slugs.flatMap((slug) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}/${lang}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: { languages: alternates(`/projects/${slug}`) },
    }))
  )

  return [...staticEntries, ...projectEntries]
}
