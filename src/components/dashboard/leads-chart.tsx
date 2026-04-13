"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { mockLeadsByDay } from "@/data/mock-leads"

export function LeadsChart() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Leads por Dia</h3>
          <p className="text-sm text-gray-500">Ultimos 7 dias</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-xs font-medium text-gray-600">Leads</span>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockLeadsByDay} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "13px",
              }}
              formatter={(value) => [`${value} leads`, "Leads"]}
            />
            <Area
              type="monotone"
              dataKey="leads"
              stroke="#3B82F6"
              strokeWidth={2.5}
              fill="url(#leadGradient)"
              dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
