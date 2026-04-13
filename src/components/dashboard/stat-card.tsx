"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  color?: "blue" | "emerald" | "purple" | "amber" | "red"
}

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    trend: "text-blue-600",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    trend: "text-emerald-600",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
    trend: "text-purple-600",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    trend: "text-amber-600",
  },
  red: {
    bg: "bg-red-50",
    icon: "text-red-600",
    trend: "text-red-600",
  },
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, color = "blue" }: StatCardProps) {
  const colors = colorMap[color]

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  "text-sm font-medium",
                  trend.value >= 0 ? "text-emerald-600" : "text-red-600"
                )}
              >
                {trend.value >= 0 ? "+" : ""}
                {trend.value}%
              </span>
              <span className="text-xs text-gray-400">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={cn("rounded-xl p-3", colors.bg)}>
          <Icon className={cn("h-6 w-6", colors.icon)} />
        </div>
      </div>
    </div>
  )
}
