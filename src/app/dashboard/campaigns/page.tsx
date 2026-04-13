"use client"

import { useState } from "react"
import { mockCampaigns } from "@/data/mock-leads"
import { Campaign, CampaignStatus } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { formatCurrency, formatDate, calculateCPL } from "@/lib/utils"
import {
  Megaphone,
  Plus,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Eye,
  MousePointerClick,
  Target,
  Calendar,
  Pause,
  Play,
  BarChart3,
  X,
} from "lucide-react"

const statusConfig: Record<CampaignStatus, { label: string; variant: "success" | "warning" | "secondary" | "default"; icon: React.ReactNode }> = {
  ativa: { label: "Ativa", variant: "success", icon: <Play className="h-3 w-3" /> },
  pausada: { label: "Pausada", variant: "warning", icon: <Pause className="h-3 w-3" /> },
  finalizada: { label: "Finalizada", variant: "secondary", icon: null },
  rascunho: { label: "Rascunho", variant: "default", icon: null },
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)
  const [showAdd, setShowAdd] = useState(false)
  const [newCampaign, setNewCampaign] = useState({
    nome_campanha: "",
    objetivo: "Geracao de Leads",
    orcamento_diario: 30,
    orcamento_total: 900,
    cpl_meta: 15,
  })

  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads_gerados, 0)
  const totalSpend = campaigns.reduce((sum, c) => sum + c.orcamento_total, 0)
  const avgCPL = totalLeads > 0 ? totalSpend / totalLeads : 0

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const campaign: Campaign = {
      id: `camp${campaigns.length + 1}`,
      client_id: "c1",
      ...newCampaign,
      leads_gerados: 0,
      impressoes: 0,
      cliques: 0,
      conversoes: 0,
      status: "ativa",
      data_inicio: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
    }
    setCampaigns((prev) => [...prev, campaign])
    setShowAdd(false)
    setNewCampaign({
      nome_campanha: "",
      objetivo: "Geracao de Leads",
      orcamento_diario: 30,
      orcamento_total: 900,
      cpl_meta: 15,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Megaphone className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Campanhas</h1>
          </div>
          <p className="text-gray-500">
            Registre e acompanhe suas campanhas do Meta Ads
          </p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => setShowAdd(true)}>
          <Plus className="h-4 w-4" />
          Nova Campanha
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2">
              <Megaphone className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Campanhas Ativas</p>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.filter((c) => c.status === "ativa").length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-2">
              <Users className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Leads</p>
              <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-50 p-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">CPL Medio</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(avgCPL)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Cards */}
      <div className="space-y-4">
        {campaigns.map((campaign) => {
          const status = statusConfig[campaign.status]
          const budgetUsed = campaign.cpl_atual
            ? (campaign.cpl_atual * campaign.leads_gerados / campaign.orcamento_total) * 100
            : 50
          const cplStatus = campaign.cpl_atual && campaign.cpl_meta
            ? campaign.cpl_atual <= campaign.cpl_meta ? "good" : "bad"
            : "neutral"

          return (
            <div
              key={campaign.id}
              className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {campaign.nome_campanha}
                      </h3>
                      <Badge variant={status.variant} className="gap-1">
                        {status.icon}
                        {status.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-3.5 w-3.5" />
                        Inicio: {formatDate(campaign.data_inicio)}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Target className="h-3.5 w-3.5" />
                        {campaign.objetivo}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Users className="h-3 w-3" /> Leads
                    </p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {campaign.leads_gerados}
                    </p>
                  </div>
                  <div className={`rounded-lg p-3 ${
                    cplStatus === "good" ? "bg-emerald-50" : cplStatus === "bad" ? "bg-red-50" : "bg-gray-50"
                  }`}>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <DollarSign className="h-3 w-3" /> CPL Atual
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <p className={`text-xl font-bold ${
                        cplStatus === "good" ? "text-emerald-700" : cplStatus === "bad" ? "text-red-700" : "text-gray-900"
                      }`}>
                        {campaign.cpl_atual ? formatCurrency(campaign.cpl_atual) : "-"}
                      </p>
                      {cplStatus === "good" ? (
                        <TrendingDown className="h-4 w-4 text-emerald-500" />
                      ) : cplStatus === "bad" ? (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      ) : null}
                    </div>
                    <p className="text-xs text-gray-400">Meta: {formatCurrency(campaign.cpl_meta)}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Eye className="h-3 w-3" /> Impressoes
                    </p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {campaign.impressoes?.toLocaleString("pt-BR") || "-"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <MousePointerClick className="h-3 w-3" /> Cliques
                    </p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {campaign.cliques?.toLocaleString("pt-BR") || "-"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" /> Conversoes
                    </p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {campaign.conversoes || "-"}
                    </p>
                  </div>
                </div>

                {/* Budget Progress */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">
                      Orcamento: {formatCurrency(campaign.orcamento_diario)}/dia
                    </span>
                    <span className="text-xs text-gray-500">
                      Total: {formatCurrency(campaign.orcamento_total)}
                    </span>
                  </div>
                  <Progress value={budgetUsed} color="bg-blue-500" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Campaign Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAdd(false)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl mx-4">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900">Nova Campanha</h2>
              <button
                onClick={() => setShowAdd(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Campanha *
                </label>
                <Input
                  required
                  value={newCampaign.nome_campanha}
                  onChange={(e) => setNewCampaign({ ...newCampaign, nome_campanha: e.target.value })}
                  placeholder="Ex: Harmonizacao Facial - SP"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Orcamento Diario (R$)
                  </label>
                  <Input
                    type="number"
                    value={newCampaign.orcamento_diario}
                    onChange={(e) => setNewCampaign({ ...newCampaign, orcamento_diario: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Orcamento Total (R$)
                  </label>
                  <Input
                    type="number"
                    value={newCampaign.orcamento_total}
                    onChange={(e) => setNewCampaign({ ...newCampaign, orcamento_total: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CPL Meta (R$)
                </label>
                <Input
                  type="number"
                  value={newCampaign.cpl_meta}
                  onChange={(e) => setNewCampaign({ ...newCampaign, cpl_meta: Number(e.target.value) })}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Custo por lead desejado. Consulte a aba Nichos para referencias.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowAdd(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Criar Campanha
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
