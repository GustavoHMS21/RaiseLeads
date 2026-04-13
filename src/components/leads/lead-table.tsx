"use client"

import { useState } from "react"
import { Lead, LeadStatus } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { formatPhone, formatDate, formatCurrency } from "@/lib/utils"
import {
  Phone,
  Mail,
  MessageCircle,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react"

const statusConfig: Record<LeadStatus, { label: string; variant: "default" | "warning" | "purple" | "success" | "destructive" }> = {
  novo: { label: "Novo", variant: "default" },
  contactado: { label: "Contactado", variant: "warning" },
  qualificado: { label: "Qualificado", variant: "purple" },
  convertido: { label: "Convertido", variant: "success" },
  perdido: { label: "Perdido", variant: "destructive" },
}

interface LeadTableProps {
  leads: Lead[]
  onSelectLead: (lead: Lead) => void
  onStatusChange: (leadId: string, status: LeadStatus) => void
}

export function LeadTable({ leads, onSelectLead, onStatusChange }: LeadTableProps) {
  const [sortField, setSortField] = useState<"data" | "nome" | "status">("data")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  const sorted = [...leads].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1
    if (sortField === "data") return dir * (new Date(a.data).getTime() - new Date(b.data).getTime())
    if (sortField === "nome") return dir * a.nome.localeCompare(b.nome)
    return dir * a.status.localeCompare(b.status)
  })

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDir("desc")
    }
  }

  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (sortField !== field) return <ChevronDown className="h-3 w-3 text-gray-300" />
    return sortDir === "asc" ? (
      <ChevronUp className="h-3 w-3 text-blue-500" />
    ) : (
      <ChevronDown className="h-3 w-3 text-blue-500" />
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => toggleSort("nome")}
                  className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-gray-700"
                >
                  Lead <SortIcon field="nome" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Contato
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Origem / Campanha
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => toggleSort("status")}
                  className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-gray-700"
                >
                  Status <SortIcon field="status" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Valor Est.
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => toggleSort("data")}
                  className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-gray-700"
                >
                  Data <SortIcon field="data" />
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Acoes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sorted.map((lead) => {
              const status = statusConfig[lead.status]
              return (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={() => onSelectLead(lead)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={lead.nome} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{lead.nome}</p>
                        {lead.interesse && (
                          <p className="text-xs text-gray-400">{lead.interesse}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                        {formatPhone(lead.telefone)}
                      </p>
                      {lead.email && (
                        <p className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{lead.origem}</p>
                    {lead.campanha && (
                      <p className="text-xs text-gray-400">{lead.campanha}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.status}
                      onChange={(e) => {
                        e.stopPropagation()
                        onStatusChange(lead.id, e.target.value as LeadStatus)
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-md border-0 bg-transparent text-sm font-medium focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      {Object.entries(statusConfig).map(([value, config]) => (
                        <option key={value} value={value}>
                          {config.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {lead.valor_estimado ? formatCurrency(lead.valor_estimado) : "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">{formatDate(lead.data)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={`https://wa.me/55${lead.telefone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        title="Abrir WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => onSelectLead(lead)}
                        className="rounded-lg p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title="Ver detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
