"use client"

import Link from "next/link"
import {
  UserPlus,
  Target,
  BookOpen,
  Megaphone,
  ArrowRight,
} from "lucide-react"

const actions = [
  {
    title: "Adicionar Lead",
    description: "Cadastre um novo lead manualmente",
    icon: UserPlus,
    href: "/dashboard/leads",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Escolher Nicho",
    description: "Veja templates prontos por segmento",
    icon: Target,
    href: "/dashboard/niches",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Guia de Trafego",
    description: "Aprenda passo a passo",
    icon: BookOpen,
    href: "/dashboard/guia",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Nova Campanha",
    description: "Registre uma campanha do Meta",
    icon: Megaphone,
    href: "/dashboard/campaigns",
    color: "bg-amber-50 text-amber-600",
  },
]

export function QuickActions() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Acoes Rapidas</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group flex items-start gap-3 rounded-lg border border-gray-100 p-4 hover:border-gray-200 hover:shadow-sm transition-all"
          >
            <div className={`rounded-lg p-2 ${action.color}`}>
              <action.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {action.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{action.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 mt-1 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  )
}
