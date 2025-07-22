// supabaseServer.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createSupabaseServerClient() {
  const cookieStore = cookies() // ✅ no await — this returns sync-access cookie store

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          // You can implement this later if needed — optional for basic SSR
        },
        remove(name: string, options: any) {
          // Optional
        },
      },
    }
  )
}
