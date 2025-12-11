// utils/useAuth.js
import { useEffect, useState } from 'react'
import { supabase } from './supa'

let debugCount = 0

export function useAuth() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  console.log(`👀 [useAuth RENDER] { loading: ${loading}, session: ${!!session} }`)

  useEffect(() => {
    let mounted = true
    debugCount++
    console.log(`\n🔄 useEffect RUN #${debugCount}`)

    async function init() {
      console.log(`📦 getSession() CALLED`)
      const { data } = await supabase.auth.getSession()

      console.log(`📦 getSession() RESULT:`, data.session)

      if (!mounted) return

      setSession(data.session ?? null)
      console.log(`✔ setSession(getSession)`)

      setLoading(false)
      console.log(`✔ setLoading(false)`)
    }

    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (!mounted) return
      console.log(`📡 Auth CHANGE: ${event}`, newSession)
      setSession(newSession ?? null)
      console.log(`✔ setSession(authChange)`)
    })

    console.log(`🔌 Listener attached →`, subscription)

    return () => {
      mounted = false
      console.log(`🧹 useEffect CLEANUP #${debugCount}`)

      if (subscription) {
        console.log(`⛔ unsubscribe CALLED`)
        try {
          subscription.unsubscribe()
        } catch (e) {
          console.log(`❌ unsubscribe ERROR`, e)
        }
      } else {
        console.log(`⚠️ NO subscription found`)
      }
    }
  }, [])

  return {
    session,
    user: session?.user ?? null,
    loading,
    isLoggedIn: !!session,
  }
}
