'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleRedirect = async () => {
      const { data } = await supabase.auth.getSession()
      if (data?.session) {
        
        router.replace('/admin')
      } else {
        router.replace('/')
      }
    }

    handleRedirect()
  }, [router])

  return <p>Signing you in...</p>
}
