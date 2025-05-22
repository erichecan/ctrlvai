import { Header } from '@/components/navigation/Header'
import { Footer } from '@/components/navigation/Footer'
import { AuthProvider } from '@/lib/infrastructure/auth/provider'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}