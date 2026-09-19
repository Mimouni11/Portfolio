import 'server-only'
import type en from '../../dictionaries/en.json'

export type Dict = typeof en
export type Locale = 'en' | 'fr' | 'ar'

const dictionaries: Record<Locale, () => Promise<Dict>> = {
  en: () => import('../../dictionaries/en.json').then((m) => m.default),
  fr: () => import('../../dictionaries/fr.json').then((m) => m.default as Dict),
  ar: () => import('../../dictionaries/ar.json').then((m) => m.default as Dict),
}

export const hasLocale = (lang: string): lang is Locale => lang in dictionaries

export const getDictionary = (lang: Locale): Promise<Dict> => dictionaries[lang]()
