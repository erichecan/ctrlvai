'use client'

import { SessionProvider } from 'next-auth/react'
import type { ReactNode } from 'react'

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider
      refetchInterval={60 * 60} // 每小时刷新token
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  )
}