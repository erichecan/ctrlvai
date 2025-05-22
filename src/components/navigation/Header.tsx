'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Logo />
            </Link>
            
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link 
                href="/blog" 
                className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 font-medium"
              >
                Blog
              </Link>
              <Link
                href="/tools"
                className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 font-medium"
              >
                Tools
              </Link>
              <Link
                href="/learning"
                className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 font-medium"
              >
                Learning
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
              >
                Sign in
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}