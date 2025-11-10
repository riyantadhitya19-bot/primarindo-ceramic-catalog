'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        // Don't redirect if we're already on the login page
        if (pathname === '/admin/login') {
          setLoading(false)
          return
        }
        
        if (!session) {
          router.push('/admin/login')
          return
        }

        // For demo purposes, allow any authenticated user
        setUser(session.user)
      } catch (error) {
        console.error('Error checking user:', error)
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login')
      } else if (session) {
        setUser(session.user)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router, pathname])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user && pathname !== '/admin/login') {
    return null // This will be handled by the redirect
  }
  
  // Allow login page to render without authentication
  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}