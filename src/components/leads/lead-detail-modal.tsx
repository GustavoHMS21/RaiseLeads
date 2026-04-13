"use client"

import { Lead } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { formatPhone, formatDate, formatCurrency } from "@/lib/utils"
import {
  X,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Tag,
  Megaphone,
  DollarSign,
  FileText,
  ExternalLink,
} from "lucide-react"

const statusConfig = {
  novo: { label: "Novo", variant: "default" as const },
  contactado: { label: "Contactado", variant: "warning" as const },
  qualificado: { label: "Qualificado", variant: "purple" as const },
  convertido: { label: "Convertido", variant: "success" as const },
  perdido: { label: "Perdido", variant: "destructive" as const },
}

interface LeadDetailModalProps {
  lead: Lead | null
  onClose: () => void
}

export function LeadDetailModal({ lead, onClose }: LeadDetailModalProps) {
  if (!lead) return null

  const status = statusConfig[lead.status]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl mx-4">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <Avatar name={lead.nome} size="lg" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{lead.nome}</h2>
              <Badge variant={status.variant} className="mt-1">{status.label}</Badge>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Telefone</p>
                <p className="text-sm font-medium text-gray-900">{formatPhone(lead.telefone)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-900">{lead.email || "Nao informado"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Data</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(lead.data)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Valor Estimado</p>
                <p className="text-sm font-medium text-gray-900">
                  {lead.valor_estimado ? formatCurrency(lead.valor_estimado) : "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <Tag className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Origem</p>
              <p className="text-sm font-medium text-gray-900">{lead.origem}</p>
            </div>
          </div>

          {lead.campanha && (
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <Megaphone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Campanha</p>
                <p className="text-sm font-medium text-gray-900">{lead.campanha}</p>
              </div>
            </div>
          )}

          {lead.interesse && (
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <Tag className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Interesse</p>
                <p className="text-sm font-medium text-gray-900">{lead.interesse}</p>
              </div>
            </div>
          )}

          {lead.notas && (
            <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-3">
              <FileText className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="text-xs text-amber-600">Notas</p>
                <p className="text-sm text-amber-800">{lead.notas}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-gray-100 p-6">
          <a
            href={`https://wa.me/55${lead.telefone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="success" className="w-full gap-2">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </a>
          <a href={`tel:+55${lead.telefone}`} className="flex-1">
            <Button variant="outline" className="w-full gap-2">
              <Phone className="h-4 w-4" />
              Ligar
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
