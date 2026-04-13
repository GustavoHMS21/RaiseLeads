"use client"

import { mockLeads } from "@/data/mock-leads"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { formatPhone, formatDate } from "@/lib/utils"
import { Phone, Mail, ExternalLink } from "lucide-react"

const statusConfig = {
  novo: { label: "Novo", variant: "default" as const },
  contactado: { label: "Contactado", variant: "warning" as const },
  qualificado: { label: "Qualificado", variant: "purple" as const },
  convertido: { label: "Convertido", variant: "success" as const },
  perdido: { label: "Perdido", variant: "destructive" as const },
}

export function RecentLeads() {
  const recentLeads = mockLeads.slice(0, 6)

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-6 pb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Leads Recentes</h3>
          <p className="text-sm text-gray-500">Ultimos leads recebidos</p>
        </div>
        <a
          href="/dashboard/leads"
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Ver todos
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="divide-y divide-gray-50">
        {recentLeads.map((lead) => {
          const status = statusConfig[lead.status]
          return (
            <div
              key={lead.id}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar name={lead.nome} size="sm" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{lead.nome}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Phone className="h-3 w-3" />
                      {formatPhone(lead.telefone)}
                    </span>
                    {lead.email && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-gray-500">{lead.campanha}</p>
                  <p className="text-xs text-gray-400">{formatDate(lead.data)}</p>
                </div>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
