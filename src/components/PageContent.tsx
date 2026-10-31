import type { ReactNode } from 'react'

type PageContentProps = { children: ReactNode }

export default function PageContent({ children }: PageContentProps) {
  return <main className="page-content">{children}</main>
}
