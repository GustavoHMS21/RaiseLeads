"use client"

import { Users, TrendingUp, DollarSign, Megaphone, Target, BarChart3 } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { LeadsChart } from "@/components/dashboard/leads-chart"
import { LeadsStatusChart } from "@/components/dashboard/leads-status-chart"
import { RecentLeads } from "@/components/dashboard/recent-leads"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { mockDashboardStats } from "@/data/mock-leads"
import { formatCurrency } from "@/lib/utils"

export default function DashboardPage() {
  const stats = mockDashboardStats

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Visao geral dos seus leads e campanhas
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total de Leads"
          value={stats.total_leads}
          subtitle={`${stats.leads_mes} este mes`}
          icon={Users}
          trend={{ value: 23, label: "vs mes anterior" }}
          color="blue"
        />
        <StatCard
          title="CPL Medio"
          value={formatCurrency(stats.cpl_medio)}
          subtitle="Custo por lead"
          icon={DollarSign}
          trend={{ value: -12, label: "vs mes anterior" }}
          color="emerald"
        />
        <StatCard
          title="Taxa de Conversao"
          value={`${stats.taxa_conversao}%`}
          subtitle="Lead para cliente"
          icon={TrendingUp}
          trend={{ value: 5, label: "vs mes anterior" }}
          color="purple"
        />
        <StatCard
          title="Campanhas Ativas"
          value={stats.campanhas_ativas}
          subtitle={formatCurrency(stats.orcamento_total) + " investido"}
          icon={Megaphone}
          color="amber"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LeadsChart />
        </div>
        <div>
          <LeadsStatusChart />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentLeads />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
