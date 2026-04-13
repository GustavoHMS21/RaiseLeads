"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { mockLeadsByStatus } from "@/data/mock-leads"

const statusLabels: Record<string, string> = {
  novo: "Novos",
  contactado: "Contactados",
  qualificado: "Qualificados",
  convertido: "Convertidos",
  perdido: "Perdidos",
}

export function LeadsStatusChart() {
  const total = mockLeadsByStatus.reduce((acc, item) => acc + item.count, 0)

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Status dos Leads</h3>
        <p className="text-sm text-gray-500">Distribuicao atual</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="h-[200px] w-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockLeadsByStatus}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="count"
              >
                {mockLeadsByStatus.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `${value} leads`,
                  statusLabels[name as string] || name,
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3">
          {mockLeadsByStatus.map((item) => (
            <div key={item.status} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">
                  {statusLabels[item.status]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">
                  {item.count}
                </span>
                <span className="text-xs text-gray-400">
                  ({Math.round((item.count / total) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
