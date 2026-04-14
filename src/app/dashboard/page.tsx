"use client"

import { useEffect, useState } from "react"
import { Users, TrendingUp, DollarSign, Megaphone, Loader2 } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { LeadsChart } from "@/components/dashboard/leads-chart"
import { LeadsStatusChart } from "@/components/dashboard/leads-status-chart"
import { RecentLeads } from "@/components/dashboard/recent-leads"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { formatCurrency } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useClientId } from "@/hooks/use-client-id"
import type { Lead, LeadsByDay, LeadsByStatus, LeadStatus } from "@/types"

const STATUS_COLORS: Record<LeadStatus, string> = {
  novo: "#3B82F6",
  contactado: "#F59E0B",
  qualificado: "#8B5CF6",
  convertido: "#10B981",
  perdido: "#EF4444",
}

const STATUS_ORDER: LeadStatus[] = [
  "novo",
  "contactado",
  "qualificado",
  "convertido",
  "perdido",
]

function formatDayLabel(isoDate: string): string {
  const [, m, d] = isoDate.split("-")
  return `${d}/${m}`
}

function buildLast7Days(leads: Lead[]): LeadsByDay[] {
  const days: LeadsByDay[] = []
  const today = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const iso = d.toISOString().split("T")[0]
    const count = leads.filter((l) => l.data === iso).length
    days.push({ date: formatDayLabel(iso), leads: count })
  }
  return days
}

function buildStatusBreakdown(leads: Lead[]): LeadsByStatus[] {
  return STATUS_ORDER.map((status) => ({
    status,
    count: leads.filter((l) => l.status === status).length,
    color: STATUS_COLORS[status],
  }))
}

export default function DashboardPage() {
  const clientId = useClientId()
  const [leads, setLeads] = useState<Lead[]>([])
  const [campaignStats, setCampaignStats] = useState({
    ativas: 0,
    orcamento_total: 0,
    cpl_medio: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!clientId) {
      if (clientId === "") setLoading(false)
      return
    }
    const supabase = createClient()
    Promise.all([
      supabase
        .from("leads")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false }),
      supabase
        .from("campaigns")
        .select("orcamento_total, cpl_atual, status")
        .eq("client_id", clientId),
    ]).then(([leadsRes, campRes]) => {
      setLeads((leadsRes.data ?? []) as Lead[])

      const camps = campRes.data ?? []
      const ativas = camps.filter((c) => c.status === "ativa")
      const orcamento = ativas.reduce(
        (acc, c) => acc + Number(c.orcamento_total || 0),
        0
      )
      const cpls = ativas
        .map((c) => Number(c.cpl_atual))
        .filter((n) => n > 0)
      const cpl_medio =
        cpls.length > 0 ? cpls.reduce((a, b) => a + b, 0) / cpls.length : 0

      setCampaignStats({
        ativas: ativas.length,
        orcamento_total: orcamento,
        cpl_medio,
      })
      setLoading(false)
    })
  }, [clientId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    )
  }

  const now = new Date()
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0]
  const leads_mes = leads.filter((l) => l.data >= firstOfMonth).length
  const convertidos = leads.filter((l) => l.status === "convertido").length
  const taxa_conversao =
    leads.length > 0 ? Math.round((convertidos / leads.length) * 1000) / 10 : 0

  const leadsByDay = buildLast7Days(leads)
  const leadsByStatus = buildStatusBreakdown(leads)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Visao geral dos seus leads e campanhas
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total de Leads"
          value={leads.length}
          subtitle={`${leads_mes} este mes`}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="CPL Medio"
          value={formatCurrency(campaignStats.cpl_medio)}
          subtitle="Custo por lead"
          icon={DollarSign}
          color="emerald"
        />
        <StatCard
          title="Taxa de Conversao"
          value={`${taxa_conversao}%`}
          subtitle={`${convertidos} convertidos`}
          icon={TrendingUp}
          color="purple"
        />
        <StatCard
          title="Campanhas Ativas"
          value={campaignStats.ativas}
          subtitle={formatCurrency(campaignStats.orcamento_total) + " investido"}
          icon={Megaphone}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LeadsChart data={leadsByDay} />
        </div>
        <div>
          <LeadsStatusChart data={leadsByStatus} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentLeads leads={leads} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
