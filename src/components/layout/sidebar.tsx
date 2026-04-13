"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Megaphone,
  Target,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
} from "lucide-react"

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Visao geral",
  },
  {
    label: "Leads",
    href: "/dashboard/leads",
    icon: Users,
    description: "Gerenciar leads",
  },
  {
    label: "Campanhas",
    href: "/dashboard/campaigns",
    icon: Megaphone,
    description: "Suas campanhas",
  },
  {
    label: "Nichos",
    href: "/dashboard/niches",
    icon: Target,
    description: "Templates por nicho",
  },
  {
    label: "Guia de Trafego",
    href: "/dashboard/guia",
    icon: BookOpen,
    description: "Passo a passo",
  },
  {
    label: "Configuracoes",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Ajustes do sistema",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-sm">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900">RaiseLead</span>
              <p className="text-[10px] text-gray-400 leading-none">Gestao de Leads</p>
            </div>
          </Link>
        )}
        {collapsed && (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-sm">
            <Zap className="h-5 w-5 text-white" />
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-50 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive ? "text-blue-600" : "text-gray-400"
                )}
              />
              {!collapsed && (
                <div className="flex flex-col">
                  <span>{item.label}</span>
                  {!isActive && (
                    <span className="text-[11px] text-gray-400">{item.description}</span>
                  )}
                </div>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-gray-100 p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Recolher menu</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
