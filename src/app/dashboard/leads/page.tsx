"use client"

import { useState, useMemo } from "react"
import { Lead, LeadStatus } from "@/types"
import { mockLeads } from "@/data/mock-leads"
import { LeadTable } from "@/components/leads/lead-table"
import { LeadDetailModal } from "@/components/leads/lead-detail-modal"
import { AddLeadModal } from "@/components/leads/add-lead-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Download, Filter, Users } from "lucide-react"

const statusFilters: { value: LeadStatus | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "novo", label: "Novos" },
  { value: "contactado", label: "Contactados" },
  { value: "qualificado", label: "Qualificados" },
  { value: "convertido", label: "Convertidos" },
  { value: "perdido", label: "Perdidos" },
]

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "todos">("todos")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        search === "" ||
        lead.nome.toLowerCase().includes(search.toLowerCase()) ||
        lead.telefone.includes(search) ||
        (lead.email && lead.email.toLowerCase().includes(search.toLowerCase()))
      const matchesStatus = statusFilter === "todos" || lead.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [leads, search, statusFilter])

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { todos: leads.length }
    leads.forEach((lead) => {
      counts[lead.status] = (counts[lead.status] || 0) + 1
    })
    return counts
  }, [leads])

  const handleStatusChange = (leadId: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    )
  }

  const handleAddLead = (newLead: {
    nome: string
    telefone: string
    email: string
    origem: string
    campanha: string
    interesse: string
    valor_estimado: number
  }) => {
    const lead: Lead = {
      id: String(leads.length + 1),
      client_id: "c1",
      ...newLead,
      status: "novo",
      data: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
    }
    setLeads((prev) => [lead, ...prev])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-500 mt-1">
            Gerencie todos os seus leads em um so lugar
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm" className="gap-2" onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4" />
            Novo Lead
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 shadow-sm">
          <Users className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-900">{leads.length}</span>
          <span className="text-sm text-gray-500">leads total</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nome, telefone ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                statusFilter === filter.value
                  ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {filter.label}
              <span className="text-xs opacity-60">
                {statusCounts[filter.value] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filteredLeads.length > 0 ? (
        <LeadTable
          leads={filteredLeads}
          onSelectLead={setSelectedLead}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16">
          <Users className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Nenhum lead encontrado</h3>
          <p className="text-sm text-gray-500 mt-1">
            {search || statusFilter !== "todos"
              ? "Tente alterar os filtros de busca"
              : "Adicione seu primeiro lead clicando em 'Novo Lead'"}
          </p>
        </div>
      )}

      {/* Modals */}
      <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      <AddLeadModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddLead}
      />
    </div>
  )
}
