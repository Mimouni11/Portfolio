'use client'

import { createContext, useContext } from 'react'
import type { Dict } from '@/app/[lang]/dictionaries'

interface LocaleContextValue {
  lang: string
  dict: Dict
}

const LocaleContext = createContext<LocaleContextValue>({
  lang: 'en',
  dict: {} as Dict,
})

export function LocaleProvider({
  lang,
  dict,
  children,
}: LocaleContextValue & { children: React.ReactNode }) {
  return (
    <LocaleContext.Provider value={{ lang, dict }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
