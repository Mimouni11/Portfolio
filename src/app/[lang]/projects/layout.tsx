import type { Metadata } from 'next'
import { getDictionary, hasLocale } from '../dictionaries'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const { meta: m } = await getDictionary(lang)
  return {
    title: m.projects_title,
    description: m.projects_description,
    openGraph: { title: m.projects_title, description: m.projects_description },
  }
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
