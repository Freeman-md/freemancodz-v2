'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function AuthCallback() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        router.replace('/admin')
        router.refresh()
      } else {
        router.replace('/auth/signin')
      }
    }

    checkSession()
  }, [router, supabase.auth])

  return <p>Signing you in...</p>
}
