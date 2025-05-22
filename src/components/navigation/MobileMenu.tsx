'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-700 dark:text-gray-300"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="flex-shrink-0">
                <Logo className="h-8" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-700 dark:text-gray-300"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-6">
              <Link
                href="/blog"
                className="block text-xl font-medium text-gray-900 dark:text-white py-2"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/tools"
                className="block text-xl font-medium text-gray-900 dark:text-white py-2"
                onClick={() => setIsOpen(false)}
              >
                Tools
              </Link>
              <Link
                href="/learning"
                className="block text-xl font-medium text-gray-900 dark:text-white py-2"
                onClick={() => setIsOpen(false)}
              >
                Learning
              </Link>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                {session ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block text-xl font-medium text-gray-900 dark:text-white py-4"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full text-xl font-medium py-4 justify-start px-0"
                      onClick={() => {
                        setIsOpen(false)
                        signOut()
                      }}
                    >
                      Sign out
                    </Button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block text-xl font-medium text-gray-900 dark:text-white py-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}