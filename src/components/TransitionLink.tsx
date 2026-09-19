'use client'

import { usePageTransition } from './transitions/TransitionProvider'

export default function TransitionLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
}) {
  const { navigateTo } = usePageTransition()
  return (
    <button
      onClick={() => { onClick?.(); navigateTo(href) }}
      className={className}
    >
      {children}
    </button>
  )
}
