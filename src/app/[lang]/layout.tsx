import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from './dictionaries'
import { LocaleProvider } from '@/context/LocaleContext'
import TransitionProvider from '@/components/transitions/TransitionProvider'
import HtmlLang from '@/components/HtmlLang'
import { SITE_URL, LOCALES } from '@/lib/config'

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  const m = dict.meta

  const ogLocale = lang === 'ar' ? 'ar_TN' : lang === 'fr' ? 'fr_TN' : 'en_US'

  return {
    title: m.home_title,
    description: m.home_description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: m.home_title,
      description: m.home_description,
      siteName: 'Mimouni Mohamed Aziz',
      locale: ogLocale,
      type: 'website',
    },
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}`])
      ),
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <>
      <HtmlLang lang={lang} />
      <LocaleProvider lang={lang} dict={dict}>
        <TransitionProvider>{children}</TransitionProvider>
      </LocaleProvider>
    </>
  )
}
