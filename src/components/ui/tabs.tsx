"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode }[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex gap-1 rounded-lg bg-gray-100 p-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all",
            activeTab === tab.id
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export { Tabs }
