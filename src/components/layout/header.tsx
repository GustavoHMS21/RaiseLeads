"use client"

import { Bell, Search, Plus } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Header() {
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

        <div className="ml-2 flex items-center gap-3 border-l border-gray-100 pl-4">
          <Avatar name="Minha Empresa" size="sm" />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">Minha Empresa</p>
            <p className="text-xs text-gray-400">Plano Growth</p>
          </div>
        </div>
      </div>
    </header>
  )
}
