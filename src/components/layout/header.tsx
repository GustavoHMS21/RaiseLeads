"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Bell, Search, Plus, LogOut, ChevronDown } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

type ClientRow = {
  nome_empresa: string
  plano: string
}

export function Header() {
  const router = useRouter()
  const [client, setClient] = useState<ClientRow | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase
        .from("clients")
        .select("nome_empresa, plano")
        .eq("user_id", user.id)
        .maybeSingle()
      if (data) setClient(data)
    })
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  const nome = client?.nome_empresa ?? "Minha Empresa"
  const plano = client?.plano
    ? `Plano ${client.plano.charAt(0).toUpperCase()}${client.plano.slice(1)}`
    : "Plano Starter"

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-sm px-6">
      {/* Search */}
      <div className="w-full max-w-md">
        <Input
          placeholder="Buscar leads, campanhas..."
          icon={<Search className="h-4 w-4" />}
          className="bg-gray-50 border-gray-100"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Lead
        </Button>

        <button className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="ml-2 relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-3 border-l border-gray-100 pl-4 py-1 rounded-r-lg hover:bg-gray-50 transition-colors"
          >
            <Avatar name={nome} size="sm" />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">{nome}</p>
              <p className="text-xs text-gray-400">{plano}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400 mr-2" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg py-1 z-50">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
