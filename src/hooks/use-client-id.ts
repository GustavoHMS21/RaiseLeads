"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

/**
 * Retorna o client_id (empresa) do usuario logado.
 * null = ainda carregando
 * "" = usuario sem empresa cadastrada
 */
export function useClientId() {
  const [clientId, setClientId] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        setClientId("")
        return
      }
      const { data } = await supabase
        .from("clients")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle()
      setClientId(data?.id ?? "")
    })
  }, [])

  return clientId
}
